import { Document, Model, Schema, Mongoose, NativeError } from 'mongoose';
declare class TinyMongooseSchemas<
  T extends Document,
  ModelType extends Model<T>
> {
  private _schema;
  private _mongoose;
  constructor(schema: Schema, mongoose: Mongoose);
  readonly schema: Schema;
  static from<T extends Document, ModelType extends Model<T>>(
    fields: any,
    mongoose: Mongoose
  ): TinyMongooseSchemas<T, ModelType>;
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
