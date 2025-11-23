const { check } = require("express-validator");
const db = require("../../config/db");
const ErrorAPI = require("../../utils/ErrorAppi");
const { runValidation } = require("../../middlewares/validatorMiddleware");

exports.createRestaurantValidator = [
  check("ownerId")
    .notEmpty()
    .withMessage("Owner ID is required")
    .isInt({ gt: 0 })
    .withMessage("Owner ID must be a valid integer")
    .bail()
    .custom(async (value) => {
      const owner = await db("restaurantOwner").where({ id: value }).first();
      if (!owner) throw new ErrorAPI("RestaurantOwner does not exist", 404);
      return true;
    }),

  check("name")
    .notEmpty()
    .withMessage("Restaurant name is required")
    .isString()
    .withMessage("Restaurant name must be a string"),

  check("logoUrl")
    .optional()
    .isString()
    .withMessage("Logo URL must be a string"),

  check("phone")
    .notEmpty()
    .withMessage("Phone number is required")
    .isString()
    .withMessage("Phone must be a string"),

  check("wilaya")
    .notEmpty()
    .withMessage("Wilaya is required")
    .isString()
    .withMessage("Wilaya must be a string"),

  check("commune")
    .notEmpty()
    .withMessage("Commune is required")
    .isString()
    .withMessage("Commune must be a string"),

  check("address")
    .notEmpty()
    .withMessage("Address is required")
    .isString()
    .withMessage("Address must be a string"),

  check("latitude")
    .optional()
    .isFloat()
    .withMessage("Latitude must be a float number"),

  check("longitude")
    .optional()
    .isFloat()
    .withMessage("Longitude must be a float number"),

  check("rating")
    .optional()
    .isFloat({ min: 1, max: 5 })
    .withMessage("Rating must be between 1 and 5"),

  check("status")
    .optional()
    .isIn(["Active", "Closed", "Suspended"])
    .withMessage("Status must be: Active, Closed, or Suspended"),

  check("commissionRate")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Commission rate must be a positive number"),

  runValidation,
];

exports.updateRestaurantValidator = [
  check("id")
    .notEmpty()
    .withMessage("Restaurant ID is required")
    .isInt()
    .withMessage("Restaurant ID must be an integer")
    .bail()
    .custom(async (value) => {
      const restaurant = await db("restaurant").where({ id: value }).first();
      if (!restaurant) throw new ErrorAPI("Restaurant not found", 404);
      return true;
    }),

  check("name").optional().isString().withMessage("Name must be a string"),

  check("logoUrl")
    .optional()
    .isString()
    .withMessage("Logo URL must be a string"),

  check("phone").optional().isString().withMessage("Phone must be a string"),

  check("wilaya").optional().isString().withMessage("Wilaya must be a string"),

  check("commune")
    .optional()
    .isString()
    .withMessage("Commune must be a string"),

  check("address")
    .optional()
    .isString()
    .withMessage("Address must be a string"),

  check("latitude")
    .optional()
    .isFloat()
    .withMessage("Latitude must be a float number"),

  check("longitude")
    .optional()
    .isFloat()
    .withMessage("Longitude must be a float number"),

  check("rating")
    .optional()
    .isFloat({ min: 1, max: 5 })
    .withMessage("Rating must be between 1 and 5"),

  check("status")
    .optional()
    .isIn(["Active", "Closed", "Suspended"])
    .withMessage("Status must be: Active, Closed, Suspended"),

  check("commissionRate")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Commission rate must be a positive number"),

  runValidation,
];

exports.getRestaurantByIdValidator = [
  check("id")
    .notEmpty()
    .withMessage("Restaurant ID is required")
    .isInt()
    .withMessage("Restaurant ID must be an integer"),
  runValidation,
];

exports.deleteRestaurantValidator = [
  check("id")
    .notEmpty()
    .withMessage("Restaurant ID is required")
    .bail()
    .custom(async (value) => {
      const restaurant = await db("restaurant").where({ id: value }).first();
      if (!restaurant) throw new ErrorAPI("Restaurant not found", 404);
      return true;
    }),
  runValidation,
];
