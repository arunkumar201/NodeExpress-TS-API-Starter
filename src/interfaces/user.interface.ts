import { Model, ObjectId } from 'mongoose';

interface UserDocument {
  id?: ObjectId;
  name: string;
  email: string;
  password: string;
  role: string;
}

interface UserModel extends Model<UserDocument> {
  isEmailTaken(email: string, excludeUserId?: ObjectId): boolean;
  toJSON(schema: any): void;
  paginate(filter: any, options: any): any;
}

export { UserModel, UserDocument };
