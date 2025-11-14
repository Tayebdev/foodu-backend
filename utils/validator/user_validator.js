const { check } = require("express-validator");
const db = require("../../config/db");
const ErrorAPI = require("../..//utils/ErrorAppi");
const bcrypt = require("bcryptjs");
const { runValidation } = require("../../middlewares/validatorMiddleware");

exports.createUserValidator = [
  check("name")
    .notEmpty()
    .withMessage("name is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("name must be between 2 and 50 characters"),
  check("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .bail()
    .custom(async (value) => {
      const existing = await db("user").where({ email: value }).first();
      if (existing) throw new ErrorAPI("Email already exists", 400);
    }),
  check("phone")
    .notEmpty()
    .withMessage("phone is required")
    .isMobilePhone()
    .withMessage("Invalid phone number")
    .bail()
    .custom(async (value) => {
      const existing = await db("user").where({ phone: value }).first();
      if (existing) throw new ErrorAPI("Phone already exists", 400);
    }),
  check("role").notEmpty().withMessage("role is required"),
  check("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
  runValidation,
];

exports.updateUserValidator = [
  check("name")
    .optional()
    .isLength({ min: 2, max: 50 })
    .withMessage("name must be between 2 and 50 characters"),
  check("email")
    .optional()
    .isEmail()
    .withMessage("Invalid email format")
    .bail()
    .custom(async (value, { req }) => {
      const existing = await db("user")
        .where({ email: value })
        .andWhereNot("userId", req.params.id)
        .first();
      if (existing) throw new ErrorAPI("Email already exists", 400);
    }),
  check("phone")
    .optional()
    .isMobilePhone()
    .withMessage("Invalid phone number")
    .bail()
    .custom(async (value, { req }) => {
      const existing = await db("user")
        .where({ phone: value })
        .andWhereNot("userId", req.params.id)
        .first();
      if (existing) throw new ErrorAPI("Phone already exists", 400);
    }),
  check("password")
    .optional()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
];

exports.changePasswordValidator = [
  check("id")
    .notEmpty()
    .withMessage("User ID is required")
    .custom(async (value) => {
      const user = await db("user").where({ id: value }).first();
      if (!user) {
        throw new ErrorAPI("User not found", 404);
      }
      return true;
    }),
  check("oldPassword").notEmpty().withMessage("oldPassword is required"),
  check("newPassword")
    .notEmpty()
    .withMessage("newPassword is required")
    .isLength({ min: 8 })
    .withMessage("newPassword must be at least 8 characters"),
  check("confirmPassword")
    .notEmpty()
    .withMessage("confirmPassword is required")
    .custom(async (value, { req }) => {
      const user = await db("user").where({ id: req.body.id }).first();
      if (!user) {
        throw new ErrorAPI("User not found", 404);
      }
      const isMatch = await bcrypt.compare(req.body.oldPassword, user.password);
      if (!isMatch) {
        throw new ErrorAPI("Old password is incorrect", 400);
      }
      if (value !== req.body.newPassword) {
        throw new ErrorAPI("confirmPassword does not match newPassword", 400);
      }
      return true;
    }),
  runValidation,
];

exports.getByEmailValidator = [
  check("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("Invalid email format"),
  runValidation,
];
exports.getByPhoneValidator = [
  check("phone")
    .notEmpty()
    .withMessage("phone is required")
    .isMobilePhone()
    .withMessage("Invalid phone number"),
  runValidation,
];

exports.deleteUserValidator = [
  check("id").notEmpty().withMessage("User ID is required"),
  runValidation,
];
