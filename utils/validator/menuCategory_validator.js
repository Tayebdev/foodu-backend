const { check } = require("express-validator");
const db = require("../../config/db");
const ErrorAPI = require("../../utils/ErrorAppi");
const { runValidation } = require("../../middlewares/validatorMiddleware");

exports.createMenuCategoryValidator = [
  check("restaurantId")
    .notEmpty()
    .withMessage("restaurantId is required")
    .isInt({ gt: 0 })
    .withMessage("restaurantId must be a valid integer")
    .bail()
    .custom(async (value) => {
      const restaurant = await db("restaurant").where({ id: value }).first();
      if (!restaurant) {
        throw new ErrorAPI("Restaurant not found", 404);
      }
      return true;
    }),

  check("name")
    .notEmpty()
    .withMessage("name is required")
    .isString()
    .withMessage("name must be a string"),

  check("description")
    .optional()
    .isString()
    .withMessage("description must be a string"),

  check("picture")
    .notEmpty()
    .withMessage("picture is required")
    .isString()
    .withMessage("picture must be a string"),

  check("displayOrder")
    .notEmpty()
    .withMessage("displayOrder is required")
    .isInt({ min: 0 })
    .withMessage("displayOrder must be a positive integer"),

  check("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be boolean"),

  runValidation,
];

exports.updateMenuCategoryValidator = [
  check("id")
    .notEmpty()
    .withMessage("Category ID is required")
    .isInt({ gt: 0 })
    .withMessage("Category ID must be a valid integer")
    .bail()
    .custom(async (value) => {
      const category = await db("menuCategory").where({ id: value }).first();
      if (!category) {
        throw new ErrorAPI("Menu category not found", 404);
      }
      return true;
    }),

  check("restaurantId")
    .optional()
    .isInt({ gt: 0 })
    .withMessage("restaurantId must be a valid integer")
    .custom(async (value) => {
      if (!value) return true;
      const restaurant = await db("restaurant").where({ id: value }).first();
      if (!restaurant) {
        throw new ErrorAPI("Restaurant not found", 404);
      }
      return true;
    }),

  check("name").optional().isString().withMessage("name must be a string"),

  check("description")
    .optional()
    .isString()
    .withMessage("description must be a string"),

  check("picture")
    .optional()
    .isString()
    .withMessage("picture must be a string"),

  check("displayOrder")
    .optional()
    .isInt({ min: 0 })
    .withMessage("displayOrder must be a positive integer"),

  check("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be boolean"),

  runValidation,
];

exports.getMenuCategoryByIdValidator = [
  check("id")
    .notEmpty()
    .withMessage("Category ID is required")
    .isInt()
    .withMessage("Category ID must be an integer"),

  runValidation,
];

exports.deleteMenuCategoryValidator = [
  check("id")
    .notEmpty()
    .withMessage("Category ID is required")
    .isInt()
    .withMessage("Category ID must be an integer")
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

exports.getMenuCategoriesByRestaurantValidator = [
  check("restaurantId")
    .notEmpty()
    .withMessage("restaurantId is required")
    .isInt({ gt: 0 })
    .withMessage("restaurantId must be a valid integer")
    .bail()
    .custom(async (value) => {
      const restaurant = await db("restaurant").where({ id: value }).first();
      if (!restaurant) {
        throw new ErrorAPI("Restaurant not found", 404);
      }
      return true;
    }),

  runValidation,
];
