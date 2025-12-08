const { check } = require("express-validator");
const db = require("../../config/db");
const ErrorAPI = require("../../utils/ErrorAppi");
const { runValidation } = require("../../middlewares/validatorMiddleware");

exports.createAdminValidator = [
  check("userId")
    .notEmpty()
    .withMessage("userId is required")
    .isInt({ gt: 0 })
    .withMessage("userId must be a valid integer")
    .bail()
    .custom(async (value) => {
      const user = await db("user").where({ id: value }).first();
      if (!user) throw new ErrorAPI("User does not exist", 404);
      return true;
    }),

  check("level")
    .optional()
    .isIn(["SuperAdmin", "Moderator", "Support"])
    .withMessage("level must be one of SuperAdmin, Moderator, Support"),

  check("permissions")
    .optional()
    .isArray()
    .withMessage("permissions must be an array of strings"),

  runValidation,
];

exports.updateAdminValidator = [
  check("id")
    .notEmpty()
    .withMessage("Admin ID is required")
    .isString()
    .withMessage("Admin ID must be a string")
    .bail()
    .custom(async (value) => {
      const admin = await db("admin").where({ id: value }).first();
      if (!admin) throw new ErrorAPI("Admin not found", 404);
      return true;
    }),

  check("userId")
    .optional()
    .isInt({ gt: 0 })
    .withMessage("userId must be a valid integer")
    .bail()
    .custom(async (value) => {
      if (!value) return true;
      const user = await db("user").where({ id: value }).first();
      if (!user) throw new ErrorAPI("User does not exist", 404);
      return true;
    }),

  check("level")
    .optional()
    .isIn(["SuperAdmin", "Moderator", "Support"])
    .withMessage("level must be one of SuperAdmin, Moderator, Support"),

  check("permissions")
    .optional()
    .isArray()
    .withMessage("permissions must be an array of strings"),

  runValidation,
];

exports.getAdminByIdValidator = [
  check("id")
    .notEmpty()
    .withMessage("Admin ID is required")
    .isString()
    .withMessage("Admin ID must be a string"),
  runValidation,
];

exports.deleteAdminValidator = [
  check("id")
    .notEmpty()
    .withMessage("Admin ID is required")
    .isString()
    .withMessage("Admin ID must be a string")
    .bail()
    .custom(async (value) => {
      const admin = await db("admin").where({ id: value }).first();
      if (!admin) throw new ErrorAPI("Admin not found", 404);
      return true;
    }),
  runValidation,
];
