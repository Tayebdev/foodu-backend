const { check } = require("express-validator");
const db = require("../../config/db");
const ErrorAPI = require("../../utils/ErrorAppi");
const { runValidation } = require("../../middlewares/validatorMiddleware");

exports.createBannerValidator = [
  check("picture")
    .notEmpty()
    .withMessage("picture is required")
    .isString()
    .withMessage("picture must be a string (URL)"),

  check("title")
    .notEmpty()
    .withMessage("title is required")
    .isLength({ min: 2, max: 200 })
    .withMessage("title must be between 2 and 200 characters"),

  check("actionUrl")
    .notEmpty()
    .withMessage("actionUrl is required")
    .isString()
    .withMessage("actionUrl must be a string"),

  check("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be a boolean"),

  runValidation,
];

exports.updateBannerValidator = [
  check("id")
    .notEmpty()
    .withMessage("Banner ID is required")
    .bail()
    .custom(async (value) => {
      const banner = await db("banner").where({ id: value }).first();
      if (!banner) throw new ErrorAPI("Banner not found", 404);
      return true;
    }),

  check("picture")
    .optional()
    .isString()
    .withMessage("picture must be a valid string (URL)"),

  check("title")
    .optional()
    .isLength({ min: 2, max: 200 })
    .withMessage("title must be between 2 and 200 characters"),

  check("actionUrl")
    .optional()
    .isString()
    .withMessage("actionUrl must be a string"),

  check("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be a boolean"),

  runValidation,
];

exports.getBannerByIdValidator = [
  check("id")
    .notEmpty()
    .withMessage("Banner ID is required")
    .isInt()
    .withMessage("Banner ID must be an integer"),
  runValidation,
];

exports.deleteBannerValidator = [
  check("id")
    .notEmpty()
    .withMessage("Banner ID is required")
    .bail()
    .custom(async (value) => {
      const banner = await db("banner").where({ id: value }).first();
      if (!banner) throw new ErrorAPI("Banner not found", 404);
      return true;
    }),
  runValidation,
];
