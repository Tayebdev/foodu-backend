const { check } = require("express-validator");
const db = require("../../config/db");
const ErrorAPI = require("../../utils/ErrorAppi");
const { runValidation } = require("../../middlewares/validatorMiddleware");

exports.createCartValidator = [
  check("clientId")
    .notEmpty()
    .withMessage("clientId is required")
    .isInt({ gt: 0 })
    .withMessage("clientId must be a valid integer")
    .bail()
    .custom(async (value) => {
      const client = await db("client").where({ id: value }).first();
      if (!client) throw new ErrorAPI("Client does not exist", 404);
      return true;
    }),

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

  check("total")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("total must be a positive number"),

  runValidation,
];

exports.updateCartValidator = [
  check("id")
    .notEmpty()
    .withMessage("Cart ID is required")
    .isInt()
    .withMessage("Cart ID must be an integer")
    .bail()
    .custom(async (value) => {
      const cart = await db("cart").where({ id: value }).first();
      if (!cart) throw new ErrorAPI("Cart not found", 404);
      return true;
    }),

  check("clientId")
    .optional()
    .isInt({ gt: 0 })
    .withMessage("clientId must be a valid integer")
    .custom(async (value) => {
      if (!value) return true;
      const client = await db("client").where({ id: value }).first();
      if (!client) throw new ErrorAPI("Client does not exist", 404);
      return true;
    }),

  check("restaurantId")
    .optional()
    .isInt({ gt: 0 })
    .withMessage("restaurantId must be a valid integer")
    .custom(async (value) => {
      if (!value) return true;
      const restaurant = await db("restaurant").where({ id: value }).first();
      if (!restaurant) throw new ErrorAPI("Restaurant does not exist", 404);
      return true;
    }),

  check("total")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("total must be a positive number"),

  runValidation,
];

exports.getCartByIdValidator = [
  check("id")
    .notEmpty()
    .withMessage("Cart ID is required")
    .isInt()
    .withMessage("Cart ID must be an integer"),
  runValidation,
];

exports.deleteCartValidator = [
  check("id")
    .notEmpty()
    .withMessage("Cart ID is required")
    .isInt()
    .withMessage("Cart ID must be an integer")
    .bail()
    .custom(async (value) => {
      const cart = await db("cart").where({ id: value }).first();
      if (!cart) throw new ErrorAPI("Cart not found", 404);
      return true;
    }),
  runValidation,
];
