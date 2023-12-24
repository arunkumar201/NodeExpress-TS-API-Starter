import { ObjectId } from 'mongoose';

interface TokenDocument {
  token: string;
  user: ObjectId;
  type: string;
  expires: Date;
  blacklisted: boolean;
}

export { TokenDocument };
