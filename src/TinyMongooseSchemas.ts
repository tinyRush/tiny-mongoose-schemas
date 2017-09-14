/// <reference types="tiny-promises" />
import * as mongoose from 'mongoose';

class TinyMongooseSchemas<
  T,
  DocType extends mongoose.Document,
  ModelType extends mongoose.Model<DocType>
> {
  private _schema: mongoose.Schema;
  constructor(schema: mongoose.Schema) {
    this._schema = schema;
    this.schema.pre('validate', function(next) {
      delete this.created_at;
      delete this.updated_at;
      next();
    });
    this._schema.pre('save', function(next) {
      this.created_at = Date.now();
      this.updated_at = this.created_at;
      next();
    });
    this._schema.pre('update', preUpdate);
    this._schema.pre('findByIdAndUpdate', preUpdate);
    this._schema.pre('findOneAndUpdate', preUpdate);
  }
  get schema(): mongoose.Schema {
    return this._schema;
  }
  public static from<
    T,
    DocType extends mongoose.Document,
    ModelType extends mongoose.Model<DocType>
  >(fields: any): TinyMongooseSchemas<T, DocType, ModelType> {
    if (!fields.created_at) fields.created_at = { type: Date };
    if (!fields.updated_at) fields.updated_at = { type: Date };
    return new TinyMongooseSchemas<T, DocType, ModelType>(new mongoose.Schema(fields));
  }
  toModel(name: string): ModelType {
    return <ModelType>mongoose.model<DocType>(name, this._schema);
  }
  pre(
    action: string,
    funcs:
      | ((arg) => Promise<T>)[]
      | ((next: (err?: mongoose.NativeError) => void) => void)
  ) {
    if (Array.isArray(funcs)) {
      this._schema.pre(action, function(next) {
        Promise.pipeArray(funcs)(this)
          .then(obj => next())
          .catch(error => next(error));
      });
    } else {
      this._schema.pre(action, funcs);
    }
  }
  methods(name: string, func: any) {
    this._schema.methods[name] = func;
  }
  statics(name: string, func: any) {
    this._schema.statics[name] = func;
  }
}

function preUpdate(next) {
  this.update({}, { updated_at: Date.now() });
  next();
}

export { TinyMongooseSchemas };
