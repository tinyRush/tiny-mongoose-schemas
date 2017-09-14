import { Document, Model, Schema, Mongoose, NativeError } from 'mongoose';
declare class TinyMongooseSchemas<
  T,
  DocType extends Document,
  ModelType extends Model<DocType>
> {
  private _schema;
  private _mongoose;
  constructor(schema: Schema, mongoose: Mongoose);
  readonly schema: Schema;
  static from<T, DocType extends Document, ModelType extends Model<DocType>>(
    fields: any,
    mongoose: Mongoose
  ): TinyMongooseSchemas<T, DocType, ModelType>;
  toModel(name: string): ModelType;
  pre(
    action: string,
    funcs:
      | ((arg) => Promise<T>)[]
      | ((next: (err?: NativeError) => void) => void)
  ): void;
  methods(name: string, func: any): void;
  statics(name: string, func: any): void;
}
export { TinyMongooseSchemas };
