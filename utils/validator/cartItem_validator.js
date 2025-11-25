const { check } = require("express-validator");
const db = require("../../config/db");
const ErrorAPI = require("../../utils/ErrorAppi");
const { runValidation } = require("../../middlewares/validatorMiddleware");

exports.createCartItemValidator = [
  check("cartId")
    .notEmpty()
    .withMessage("cartId is required")
    .isInt({ gt: 0 })
    .withMessage("cartId must be a valid integer")
    .bail()
    .custom(async (value) => {
      const cart = await db("cart").where({ id: value }).first();
      if (!cart) throw new ErrorAPI("Cart not found", 404);
      return true;
    }),

  check("menuItemId")
    .notEmpty()
    .withMessage("menuItemId is required")
    .isInt({ gt: 0 })
    .withMessage("menuItemId must be a valid integer")
    .bail()
    .custom(async (value) => {
      const menu = await db("menuItem").where({ id: value }).first();
      if (!menu) throw new ErrorAPI("Menu item not found", 404);
      return true;
    }),

  check("quantity")
    .notEmpty()
    .withMessage("quantity is required")
    .isInt({ gt: 0 })
    .withMessage("quantity must be a positive integer"),

  check("subtotal")
    .notEmpty()
    .withMessage("subtotal is required")
    .isFloat({ gt: 0 })
    .withMessage("subtotal must be a positive number"),

  runValidation,
];

exports.updateCartItemValidator = [
  check("id")
    .notEmpty()
    .withMessage("cartItem ID is required")
    .bail()
    .custom(async (value) => {
      const item = await db("cartItem").where({ id: value }).first();
      if (!item) throw new ErrorAPI("Cart item not found", 404);
      return true;
    }),

  check("quantity")
    .optional()
    .isInt({ gt: 0 })
    .withMessage("quantity must be a positive integer"),

  check("subtotal")
    .optional()
    .isFloat({ gt: 0 })
    .withMessage("subtotal must be a positive number"),

  runValidation,
];

exports.getCartItemByIdValidator = [
  check("id")
    .notEmpty()
    .withMessage("cartItem ID is required")
    .isInt()
    .withMessage("cartItem ID must be an integer"),
  runValidation,
];

exports.deleteCartItemValidator = [
  check("id")
    .notEmpty()
    .withMessage("cartItem ID is required")
    .bail()
    .custom(async (value) => {
      const item = await db("cartItem").where({ id: value }).first();
      if (!item) throw new ErrorAPI("Cart item not found", 404);
      return true;
    }),
  runValidation,
];
