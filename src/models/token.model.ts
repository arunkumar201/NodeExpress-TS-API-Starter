import mongoose from 'mongoose';
import { toJSON } from './plugins';
import tokenTypes from '../config/tokens';
import { TokenDocument } from '../interfaces';

const schema = new mongoose.Schema<TokenDocument>(
  {
    token: {
      type: String,
      required: true,
      index: true,
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: [tokenTypes.REFRESH, tokenTypes.RESET_PASSWORD, tokenTypes.VERIFY_EMAIL],
      required: true,
    },
    expires: {
      type: Date,
      required: true,
    },
    blacklisted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
schema.plugin(toJSON);

/**
 * @typedef Token
 */
export const Token = mongoose.model<TokenDocument>('Token', schema);
