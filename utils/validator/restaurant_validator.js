const { check } = require("express-validator");
const db = require("../../config/db");
const ErrorAPI = require("../../utils/ErrorAppi");
const { runValidation } = require("../../middlewares/validatorMiddleware");

exports.createRestaurantValidator = [
  check("ownerId")
    .notEmpty()
    .withMessage("ownerId is required")
    .isInt({ gt: 0 })
    .withMessage("ownerId must be a valid integer")
    .bail()
    .custom(async (value) => {
      const owner = await db("restaurantOwner").where({ id: value }).first();
      if (!owner) throw new ErrorAPI("Restaurant owner not found", 404);
      return true;
    }),
  check("name").notEmpty().withMessage("name is required"),
  check("picture").notEmpty().withMessage("picture is required"),
  check("phone").notEmpty().withMessage("phone is required"),
  check("email").optional().isEmail().withMessage("email must be valid"),
  check("wilaya").notEmpty().withMessage("wilaya is required"),
  check("commune").notEmpty().withMessage("commune is required"),
  check("address").notEmpty().withMessage("address is required"),
  check("status")
    .optional()
    .isIn(["Active", "Closed", "Suspended", "PendingApproval"])
    .withMessage(
      "status must be Active, Closed, Suspended, or PendingApproval"
    ),
  check("commissionRate")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("commissionRate must be a positive number"),

  check("deliveryRadius")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("deliveryRadius must be a positive number"),

  check("minOrderAmount")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("minOrderAmount must be a positive number"),

  check("avgDeliveryTime")
    .optional()
    .isInt({ min: 0 })
    .withMessage("avgDeliveryTime must be a positive integer"),
  check("isBlocked").optional().isBoolean(),
  check("isFeatured").optional().isBoolean(),
  check("acceptsCOD").optional().isBoolean(),

  runValidation,
];

exports.updateRestaurantValidator = [
  check("id")
    .notEmpty()
    .withMessage("Restaurant ID is required")
    .isInt({ gt: 0 })
    .withMessage("Restaurant ID must be a valid integer")
    .bail()
    .custom(async (value) => {
      const restaurant = await db("restaurant").where({ id: value }).first();
      if (!restaurant) throw new ErrorAPI("Restaurant not found", 404);
      return true;
    }),
  check("ownerId")
    .optional()
    .isInt({ gt: 0 })
    .withMessage("ownerId must be a valid integer")
    .custom(async (value) => {
      if (!value) return true;
      const owner = await db("restaurantOwner").where({ id: value }).first();
      if (!owner) throw new ErrorAPI("Restaurant owner not found", 404);
      return true;
    }),
  check("name").optional(),
  check("picture").optional(),
  check("bannerUrl").optional(),

  check("phone").optional(),
  check("email").optional().isEmail(),

  check("wilaya").optional(),
  check("commune").optional(),
  check("address").optional(),

  check("latitude").optional().isFloat({ min: -90, max: 90 }),
  check("longitude").optional().isFloat({ min: -180, max: 180 }),

  check("status")
    .optional()
    .isIn(["Active", "Closed", "Suspended", "PendingApproval"]),

  check("commissionRate").optional().isFloat({ min: 0 }),
  check("deliveryRadius").optional().isFloat({ min: 0 }),
  check("minOrderAmount").optional().isFloat({ min: 0 }),
  check("avgDeliveryTime").optional().isInt({ min: 0 }),

  check("isBlocked").optional().isBoolean(),
  check("isFeatured").optional().isBoolean(),
  check("acceptsCOD").optional().isBoolean(),

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
exports.updateStatusValidator = [
  check("id")
    .notEmpty()
    .withMessage("Restaurant ID is required")
    .isInt()
    .withMessage("Restaurant ID must be an integer")
    .custom(async (value) => {
      const restaurant = await db("restaurant").where({ id: value }).first();
      if (!restaurant) throw new ErrorAPI("Restaurant not found", 404);
      return true;
    }),
  ,
  check("status")
    .notEmpty()
    .withMessage("status is required")
    .isIn(["Active", "Closed", "Suspended", "PendingApproval"])
    .withMessage(
      "status must be Active, Closed, Suspended, or PendingApproval"
    ),
  runValidation,
];
