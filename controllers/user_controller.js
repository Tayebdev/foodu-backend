const UserModel = require("../models/user_model");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const ErrorAPI = require("../utils/ErrorAppi");
const { deleteOne, getAll, getOne, updateOne } = require("./factory_handler");

const getAllUsers = getAll(UserModel, "user");
const deleteUser = deleteOne(UserModel, "user");
const getUserById = getOne(UserModel, "user");
const updateUser = updateOne(UserModel, "user");
const getUserByEmail = asyncHandler(async (req, res, next) => {
  const user = await UserModel.getByEmail(req.params.email);
  res.status(200).json({
    status: "success",
    data: user,
  });
});
const getUserByPhone = asyncHandler(async (req, res, next) => {
  const user = await UserModel.getByPhone(req.params.phone);
  res.status(200).json({
    status: "success",
    data: user,
  });
});
const changePasswordUser = asyncHandler(async (req, res, next) => {
  await User.changePassword(req.params.id, req.body.password);
  res.status(200).json({
    status: "success",
    message: "`User password is Updated`",
  });
});
const createUser = asyncHandler(async (req, res, next) => {
  const { password, ...userData } = req.body;
  const salt = await bcrypt.genSalt(8);
  const hashedPassword = await bcrypt.hash(password, salt);
  await UserModel.create({
    ...userData,
    password: hashedPassword,
  });
  res.status(201).json({
    status: "success",
    message: "User created successfully",
  });
});
const banUser = asyncHandler(async (req, res, next) => {
  const user = await UserModel.ban(req.params.id);
  if (!user) {
    return next(new ErrorAPI(`User not found or could not be banned`, 401));
  }
  res.status(200).json({
    status: "success",
    message: "User has been banned",
  });
});
const unbanUser = asyncHandler(async (req, res, next) => {
  const user = await UserModel.unban(req.params.id);
  if (!user) {
    return next(new ErrorAPI(`User not found or could not be unbanned`, 401));
  }
  res.status(200).json({
    status: "success",
    message: "User has been unbanned",
  });
});
const activateUser = asyncHandler(async (req, res, next) => {
  const user = await UserModel.activate(req.params.id);
  if (!user) {
    return next(new ErrorAPI(`User not found or could not be activated`, 401));
  }
  res.status(200).json({
    status: "success",
    message: "User has been activated",
  });
});

const deactivateUser = asyncHandler(async (req, res, next) => {
  const user = await UserModel.deactivate(req.params.id);
  if (!user) {
    return next(
      new ErrorAPI(`User not found or could not be deactivated`, 401)
    );
  }
  res.status(200).json({
    status: "success",
    message: "User has been deactivated",
  });
});

module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  getUserByPhone,
  getUserByEmail,
  deleteUser,
  updateUser,
  changePasswordUser,
  banUser,
  unbanUser,
  activateUser,
  deactivateUser,
};
