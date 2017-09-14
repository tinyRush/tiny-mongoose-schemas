import * as mongoose from 'mongoose';
declare class TinyMongooseSchemas<
  T,
  DocType extends mongoose.Document,
  ModelType extends mongoose.Model<DocType>
> {
  private _schema;
  constructor(schema: mongoose.Schema);
  readonly schema: mongoose.Schema;
  static from<
    T,
    DocType extends mongoose.Document,
    ModelType extends mongoose.Model<DocType>
  >(fields: any): TinyMongooseSchemas<T, DocType, ModelType>;
  toModel(name: string): ModelType;
  pre(
    action: string,
    funcs:
      | ((arg) => Promise<T>)[]
      | ((next: (err?: mongoose.NativeError) => void) => void)
  ): void;
  methods(name: string, func: any): void;
  statics(name: string, func: any): void;
}
export { TinyMongooseSchemas };
