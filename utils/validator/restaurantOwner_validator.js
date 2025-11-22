const { check } = require("express-validator");
const db = require("../../config/db");
const ErrorAPI = require("../../utils/ErrorAppi");
const { runValidation } = require("../../middlewares/validatorMiddleware");

exports.createRestaurantOwnerValidator = [
  check("userId")
    .notEmpty()
    .withMessage("User ID is required")
    .isInt({ gt: 0 })
    .withMessage("User ID must be a valid integer")
    .bail()
    .custom(async (value) => {
      const user = await db("user").where({ id: value }).first();
      if (!user) throw new ErrorAPI("User does not exist", 404);

      const existingOwner = await db("restaurantOwner")
        .where({ userId: value })
        .first();
      if (existingOwner)
        throw new ErrorAPI("This user is already a Restaurant Owner", 400);

      return true;
    }),

  check("picture")
    .optional()
    .isString()
    .withMessage("Picture must be a valid URL or string"),

  runValidation,
];

exports.updateRestaurantOwnerValidator = [
  check("id")
    .notEmpty()
    .withMessage("RestaurantOwner ID is required")
    .isInt()
    .withMessage("RestaurantOwner ID must be an integer")
    .bail()
    .custom(async (value) => {
      const owner = await db("restaurantOwner").where({ id: value }).first();
      if (!owner) throw new ErrorAPI("RestaurantOwner not found", 404);
      return true;
    }),

  check("verified")
    .optional()
    .isBoolean()
    .withMessage("Verified must be a boolean value"),

  check("documentsVerified")
    .optional()
    .isBoolean()
    .withMessage("DocumentsVerified must be a boolean value"),

  check("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be a boolean value"),

  check("picture")
    .optional()
    .isString()
    .withMessage("Picture must be a valid URL or string"),

  runValidation,
];

exports.getRestaurantOwnerByIdValidator = [
  check("id")
    .notEmpty()
    .withMessage("RestaurantOwner ID is required")
    .isInt()
    .withMessage("RestaurantOwner ID must be an integer"),
  runValidation,
];

exports.deleteRestaurantOwnerValidator = [
  check("id")
    .notEmpty()
    .withMessage("RestaurantOwner ID is required")
    .bail()
    .custom(async (value) => {
      const owner = await db("restaurantOwner").where({ id: value }).first();
      if (!owner) throw new ErrorAPI("RestaurantOwner not found", 404);
      return true;
    }),
  runValidation,
];
