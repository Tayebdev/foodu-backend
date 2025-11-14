const UserModel = require("../models/user_model");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
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
  const user = await UserModel.create({
    ...userData,
    password: hashedPassword,
  });
  res.status(201).json({
    status: "success",
    message: "User created successfully",
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
};
