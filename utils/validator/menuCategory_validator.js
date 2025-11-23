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
      if (!restaurant) throw new ErrorAPI("Restaurant does not exist", 404);
      return true;
    }),

  check("name").notEmpty().withMessage("Category name is required").bail(),

  runValidation,
];

exports.updateMenuCategoryValidator = [
  check("id")
    .notEmpty()
    .withMessage("Category ID is required")
    .bail()
    .custom(async (value) => {
      const category = await db("menuCategory").where({ id: value }).first();
      if (!category) throw new ErrorAPI("Category not found", 404);
      return true;
    }),

  check("restaurantId")
    .optional()
    .isInt({ gt: 0 })
    .withMessage("restaurantId must be a valid integer")
    .bail()
    .custom(async (value) => {
      const restaurant = await db("restaurant").where({ id: value }).first();
      if (!restaurant) throw new ErrorAPI("Restaurant does not exist", 404);
      return true;
    }),

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
    .bail()
    .custom(async (value) => {
      const category = await db("menuCategory").where({ id: value }).first();
      if (!category) throw new ErrorAPI("Category not found", 404);
      return true;
    }),
  runValidation,
];
