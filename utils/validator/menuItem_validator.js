const { check } = require("express-validator");
const db = require("../../config/db");
const ErrorAPI = require("../../utils/ErrorAppi");
const { runValidation } = require("../../middlewares/validatorMiddleware");

exports.createMenuItemValidator = [
  check("name").notEmpty().withMessage("name is required"),
  check("price")
    .notEmpty()
    .withMessage("price is required")
    .isFloat({ gt: 0 })
    .withMessage("price must be greater than 0"),
  check("discountPrice")
    .optional()
    .isFloat({ gt: 0 })
    .withMessage("discountPrice must be greater than 0"),
  check("picture").notEmpty().withMessage("picture is required"),
  check("prepTimeMinutes")
    .notEmpty()
    .withMessage("prepTimeMinutes is required")
    .isInt({ min: 0 })
    .withMessage("prepTimeMinutes must be a positive integer"),
  check("menuCategoryId")
    .notEmpty()
    .withMessage("menuCategoryId is required")
    .isInt({ gt: 0 })
    .withMessage("menuCategoryId must be a valid integer")
    .bail()
    .custom(async (value) => {
      const category = await db("menuCategory").where({ id: value }).first();
      if (!category) {
        throw new ErrorAPI("Menu category not found", 404);
      }
      return true;
    }),

  runValidation,
];

exports.updateMenuItemPriceValidator = [
  check("id")
    .notEmpty()
    .withMessage("Menu item ID is required")
    .isInt({ gt: 0 })
    .withMessage("Menu item ID must be a valid integer")
    .bail()
    .custom(async (value) => {
      const item = await db("menuItem").where({ id: value }).first();
      if (!item) {
        throw new ErrorAPI("Menu item not found", 404);
      }
      return true;
    }),
  check("price")
    .notEmpty()
    .withMessage("price is required")
    .isFloat({ gt: 0 })
    .withMessage("price must be greater than 0"),
  runValidation,
];

exports.setDiscountValidator = [
  check("id")
    .notEmpty()
    .withMessage("Menu item ID is required")
    .isInt({ gt: 0 })
    .withMessage("Menu item ID must be a valid integer")
    .bail()
    .custom(async (value, { req }) => {
      const item = await db("menuItem").where({ id: value }).first();
      if (!item) {
        throw new ErrorAPI("Menu item not found", 404);
      }
      if (req.body.discountPrice >= item.price) {
        throw new ErrorAPI(
          "discountPrice must be less than the original price",
          400
        );
      }
      return true;
    }),
  check("discountPrice")
    .notEmpty()
    .withMessage("discountPrice is required")
    .isFloat({ gt: 0 })
    .withMessage("discountPrice must be greater than 0"),
  runValidation,
];

exports.removeDiscountValidator = [
  check("id")
    .notEmpty()
    .withMessage("Menu item ID is required")
    .isInt({ gt: 0 })
    .withMessage("Menu item ID must be a valid integer")
    .bail()
    .custom(async (value) => {
      const item = await db("menuItem").where({ id: value }).first();
      if (!item) {
        throw new ErrorAPI("Menu item not found", 404);
      }
      return true;
    }),

  runValidation,
];

exports.toggleAvailabilityValidator = [
  check("id")
    .notEmpty()
    .withMessage("Menu item ID is required")
    .isInt({ gt: 0 })
    .withMessage("Menu item ID must be a valid integer")
    .bail()
    .custom(async (value) => {
      const item = await db("menuItem").where({ id: value }).first();
      if (!item) {
        throw new ErrorAPI("Menu item not found", 404);
      }
      return true;
    }),

  runValidation,
];

exports.getByMenuCategoryValidator = [
  check("menuCategoryId")
    .notEmpty()
    .withMessage("menuCategoryId is required")
    .isInt({ gt: 0 })
    .withMessage("menuCategoryId must be a valid integer")
    .bail()
    .custom(async (value) => {
      const category = await db("menuCategory").where({ id: value }).first();
      if (!category) {
        throw new ErrorAPI("Menu category not found", 404);
      }
      return true;
    }),

  runValidation,
];

exports.getMenuItemByIdValidator = [
  check("id")
    .isInt({ gt: 0 })
    .withMessage("Menu item ID must be a valid integer")
    .bail()
    .custom(async (value) => {
      const item = await db("menuItem").where({ id: value }).first();
      if (!item) {
        throw new ErrorAPI("Menu item not found", 404);
      }
      return true;
    }),

  runValidation,
];

exports.updateMenuItemValidator = [
  check("name").optional().notEmpty().withMessage("name cannot be empty"),

  check("price")
    .optional()
    .isFloat({ gt: 0 })
    .withMessage("price must be greater than 0"),

  check("discountPrice")
    .optional()
    .isFloat({ gt: 0 })
    .withMessage("discountPrice must be greater than 0"),

  check("picture").optional().notEmpty().withMessage("picture cannot be empty"),

  check("prepTimeMinutes")
    .optional()
    .isInt({ min: 0 })
    .withMessage("prepTimeMinutes must be a positive integer"),

  check("menuCategoryId")
    .optional()
    .isInt({ gt: 0 })
    .withMessage("menuCategoryId must be a valid integer")
    .bail()
    .custom(async (value) => {
      const category = await db("menuCategory").where({ id: value }).first();
      if (!category) {
        throw new ErrorAPI("Menu category not found", 404);
      }
      return true;
    }),

  runValidation,
];

exports.deleteMenuItemValidator = [
  check("id")
    .isInt({ gt: 0 })
    .withMessage("Menu item ID must be a valid integer")
    .bail()
    .custom(async (value) => {
      const item = await db("menuItem").where({ id: value }).first();
      if (!item) {
        throw new ErrorAPI("Menu item not found", 404);
      }
      return true;
    }),

  runValidation,
];
