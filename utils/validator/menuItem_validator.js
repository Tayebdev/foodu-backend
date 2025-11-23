const { check } = require("express-validator");
const db = require("../../config/db");
const ErrorAPI = require("../../utils/ErrorAppi");
const { runValidation } = require("../../middlewares/validatorMiddleware");

exports.createMenuItemValidator = [
  check("categoryId")
    .notEmpty()
    .withMessage("categoryId is required")
    .isInt({ gt: 0 })
    .withMessage("categoryId must be a valid integer")
    .bail()
    .custom(async (value) => {
      const category = await db("menuCategory").where({ id: value }).first();
      if (!category) throw new ErrorAPI("Category does not exist", 404);
      return true;
    }),

  check("name")
    .notEmpty()
    .withMessage("name is required")
    .isString()
    .withMessage("name must be a string"),

  check("price")
    .notEmpty()
    .withMessage("price is required")
    .isFloat({ min: 0 })
    .withMessage("price must be a positive number"),

  check("description")
    .optional()
    .isString()
    .withMessage("description must be a string"),

  check("picture")
    .optional()
    .isString()
    .withMessage("picture must be a string URL"),

  check("isAvailable")
    .optional()
    .isBoolean()
    .withMessage("isAvailable must be a boolean"),

  check("prepTimeMinutes")
    .optional()
    .isInt({ min: 0 })
    .withMessage("prepTimeMinutes must be a non-negative integer"),

  runValidation,
];

exports.updateMenuItemValidator = [
  check("id")
    .notEmpty()
    .withMessage("MenuItem ID is required")
    .bail()
    .custom(async (value) => {
      const menuItem = await db("menuItem").where({ id: value }).first();
      if (!menuItem) throw new ErrorAPI("MenuItem not found", 404);
      return true;
    }),

  check("categoryId")
    .optional()
    .isInt({ gt: 0 })
    .withMessage("categoryId must be a valid integer")
    .bail()
    .custom(async (value) => {
      const category = await db("menuCategory").where({ id: value }).first();
      if (!category) throw new ErrorAPI("Category does not exist", 404);
      return true;
    }),

  check("name").optional().isString().withMessage("name must be a string"),

  check("price")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("price must be a positive number"),

  check("description")
    .optional()
    .isString()
    .withMessage("description must be a string"),

  check("picture")
    .optional()
    .isString()
    .withMessage("picture must be a string URL"),

  check("isAvailable")
    .optional()
    .isBoolean()
    .withMessage("isAvailable must be a boolean"),

  check("prepTimeMinutes")
    .optional()
    .isInt({ min: 0 })
    .withMessage("prepTimeMinutes must be a non-negative integer"),

  runValidation,
];

exports.getMenuItemByIdValidator = [
  check("id")
    .notEmpty()
    .withMessage("MenuItem ID is required")
    .isInt()
    .withMessage("MenuItem ID must be an integer"),
  runValidation,
];

exports.deleteMenuItemValidator = [
  check("id")
    .notEmpty()
    .withMessage("MenuItem ID is required")
    .bail()
    .custom(async (value) => {
      const menuItem = await db("menuItem").where({ id: value }).first();
      if (!menuItem) throw new ErrorAPI("MenuItem not found", 404);
      return true;
    }),
  runValidation,
];
