const { check } = require("express-validator");
const db = require("../../config/db");
const ErrorAPI = require("../../utils/ErrorAppi");
const { runValidation } = require("../../middlewares/validatorMiddleware");

exports.createRestaurantOwnerValidator = [
  check("userId")
    .notEmpty()
    .withMessage("userId is required")
    .isInt({ gt: 0 })
    .withMessage("userId must be a valid integer")
    .bail()
    .custom(async (value) => {
      const user = await db("user").where({ id: value }).first();
      if (!user) throw new ErrorAPI("User does not exist", 404);
      const existing = await db("restaurantOwner")
        .where({ userId: value })
        .first();
      if (existing)
        throw new ErrorAPI("RestaurantOwner already exists for this user", 400);
      return true;
    }),
  check("verified")
    .optional()
    .isBoolean()
    .withMessage("verified must be boolean"),
  check("documentsVerified")
    .optional()
    .isBoolean()
    .withMessage("documentsVerified must be boolean"),
  check("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be boolean"),
  runValidation,
];

exports.updateRestaurantOwnerValidator = [
  check("id")
    .notEmpty()
    .withMessage("RestaurantOwner ID is required")
    .bail()
    .custom(async (value) => {
      const record = await db("restaurantOwner").where({ id: value }).first();
      if (!record) throw new ErrorAPI("RestaurantOwner not found", 404);
      return true;
    }),
  check("userId")
    .optional()
    .isInt({ gt: 0 })
    .withMessage("userId must be a valid integer")
    .custom(async (value, { req }) => {
      if (!value) return true;
      const user = await db("user").where({ id: value }).first();
      if (!user) throw new ErrorAPI("User does not exist", 404);
      const existing = await db("restaurantOwner")
        .where({ userId: value })
        .andWhereNot("id", req.params.id)
        .first();
      if (existing)
        throw new ErrorAPI(
          "This user already has a restaurantOwner entry",
          400
        );
      return true;
    }),

  check("verified")
    .optional()
    .isBoolean()
    .withMessage("verified must be boolean"),

  check("documentsVerified")
    .optional()
    .isBoolean()
    .withMessage("documentsVerified must be boolean"),

  check("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be boolean"),

  runValidation,
];

exports.getRestaurantOwnerByIdValidator = [
  check("id")
    .notEmpty()
    .withMessage("RestaurantOwner ID is required")
    .isInt()
    .withMessage("ID must be an integer"),
  runValidation,
];

exports.deleteRestaurantOwnerValidator = [
  check("id")
    .notEmpty()
    .withMessage("RestaurantOwner ID is required")
    .bail()
    .custom(async (value) => {
      const record = await db("restaurantOwner").where({ id: value }).first();
      if (!record) throw new ErrorAPI("RestaurantOwner not found", 404);
      return true;
    }),
  runValidation,
];
