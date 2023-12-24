import httpStatus from 'http-status';
import { ObjectId } from 'mongoose';
import { UserDocument } from '../interfaces';
import { User } from '../models';
import ApiError from '../utils/ApiError';

//Create a user
export const createUser = async (userBody: { [k: string]: any }): Promise<UserDocument> => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  return User.create(userBody);
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
export const queryUsers = async (filter: object, options: object): Promise<UserDocument[]> => {
  const users = await User.paginate(filter, options);
  return users;
};

// Get user by id
export const getUserById = async (id: ObjectId): Promise<UserDocument> => {
  return User.findById(id);
};

// Get user by email
export const getUserByEmail = async (email: string): Promise<UserDocument> => {
  return User.findOne({ email });
};

// Update user by id
export const updateUserById = async (userId: ObjectId, updateBody: { [k: string]: any }): Promise<UserDocument> => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (updateBody.email && User.isEmailTaken(updateBody.email, userId)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(user as any, updateBody as any);
  await (user as any).save();
  return user;
};

// Delete user by id
export const deleteUserById = async (userId: ObjectId): Promise<UserDocument> => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await (user as any).remove();
  return user;
};
