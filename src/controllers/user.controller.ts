import { Request, Response } from 'express';
import httpStatus from 'http-status';
import pick from '../utils/pick';
import ApiError from '../utils/ApiError';
import catchAsync from '../utils/catchAsync';
import { userService } from '../services';

const createUser = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getUsers = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await userService.queryUsers(filter, options);
  res.send(result);
});

const getUser = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const user = await userService.getUserById(req.params.userId as any);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});

const updateUser = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const user = await userService.updateUserById(req.params.userId as any, req.body);
  res.send(user);
});

const deleteUser = catchAsync(async (req: Request, res: Response): Promise<void> => {
  await userService.deleteUserById(req.params.userId as any);
  res.status(httpStatus.NO_CONTENT).send();
});

export { createUser, getUsers, getUser, updateUser, deleteUser };
