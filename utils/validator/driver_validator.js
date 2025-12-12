const { check } = require("express-validator");
const db = require("../../config/db");
const ErrorAPI = require("../../utils/ErrorAppi");
const { runValidation } = require("../../middlewares/validatorMiddleware");

exports.createDriverValidator = [
  check("userId")
    .notEmpty()
    .withMessage("userId is required")
    .isInt({ gt: 0 })
    .withMessage("userId must be a valid integer")
    .bail()
    .custom(async (value) => {
      const user = await db("user").where({ id: value }).first();
      if (!user) throw new ErrorAPI("User does not exist", 404);

      const existingDriver = await db("driver")
        .where({ userId: value })
        .first();
      if (existingDriver)
        throw new ErrorAPI("Driver already exists for this user", 400);

      return true;
    }),

  check("verified")
    .optional()
    .isBoolean()
    .withMessage("verified must be boolean"),

  check("availability")
    .optional()
    .isIn(["Online", "Offline", "Busy"])
    .withMessage("availability must be Online, Offline, or Busy"),

  check("totalTrips")
    .optional()
    .isInt({ min: 0 })
    .withMessage("totalTrips must be a non-negative integer"),

  check("completedTrips")
    .optional()
    .isInt({ min: 0 })
    .withMessage("completedTrips must be a non-negative integer"),

  check("cancelledTrips")
    .optional()
    .isInt({ min: 0 })
    .withMessage("cancelledTrips must be a non-negative integer"),

  check("rating")
    .optional()
    .isFloat({ min: 0, max: 5 })
    .withMessage("rating must be between 0 and 5"),

  check("currentLatitude")
    .optional()
    .isFloat()
    .withMessage("currentLatitude must be a number"),

  check("currentLongitude")
    .optional()
    .isFloat()
    .withMessage("currentLongitude must be a number"),

  check("lastLocationUpdate")
    .optional()
    .isISO8601()
    .withMessage("lastLocationUpdate must be a valid date"),

  check("isBlocked")
    .optional()
    .isBoolean()
    .withMessage("isBlocked must be boolean"),

  check("activeDeliveryId")
    .optional()
    .isInt({ min: 1 })
    .withMessage("activeDeliveryId must be a positive integer"),

  check("cashOnHand")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("cashOnHand must be a non-negative number"),

  runValidation,
];

exports.updateDriverValidator = [
  check("id")
    .notEmpty()
    .withMessage("Driver ID is required")
    .bail()
    .custom(async (value) => {
      const driver = await db("driver").where({ id: value }).first();
      if (!driver) throw new ErrorAPI("Driver not found", 404);
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

      const existingDriver = await db("driver")
        .where({ userId: value })
        .andWhereNot("id", req.params.id)
        .first();

      if (existingDriver)
        throw new ErrorAPI("This user already has a driver entry", 400);

      return true;
    }),

  check("verified").optional().isBoolean(),

  check("availability")
    .optional()
    .isIn(["Online", "Offline", "Busy"])
    .withMessage("availability must be Online, Offline, or Busy"),

  check("totalTrips").optional().isInt({ min: 0 }),
  check("completedTrips").optional().isInt({ min: 0 }),
  check("cancelledTrips").optional().isInt({ min: 0 }),

  check("rating")
    .optional()
    .isFloat({ min: 0, max: 5 })
    .withMessage("rating must be between 0 and 5"),

  check("currentLatitude").optional().isFloat(),
  check("currentLongitude").optional().isFloat(),

  check("lastLocationUpdate").optional().isISO8601(),

  check("isBlocked").optional().isBoolean(),

  check("activeDeliveryId").optional().isInt({ min: 1 }),

  check("cashOnHand").optional().isFloat({ min: 0 }),

  runValidation,
];

exports.getDriverByIdValidator = [
  check("id")
    .notEmpty()
    .withMessage("Driver ID is required")
    .isInt()
    .withMessage("Driver ID must be an integer"),
  runValidation,
];

exports.deleteDriverValidator = [
  check("id")
    .notEmpty()
    .withMessage("Driver ID is required")
    .bail()
    .custom(async (value) => {
      const driver = await db("driver").where({ id: value }).first();
      if (!driver) throw new ErrorAPI("Driver not found", 404);
      return true;
    }),
  runValidation,
];
exports.toggleAvailabilityValidator = [
  check("id")
    .notEmpty()
    .withMessage("Driver ID is required")
    .isInt({ gt: 0 })
    .withMessage("Driver ID must be a valid integer")
    .bail()
    .custom(async (value) => {
      const driver = await db("driver").where({ id: value }).first();
      if (!driver) throw new ErrorAPI("Driver not found", 404);
      return true;
    }),
  check("status")
    .notEmpty()
    .withMessage("status is required")
    .isIn(["Online", "Offline", "Busy"])
    .withMessage("status must be one of: Online, Offline, Busy"),

  runValidation,
];

exports.updateLocationValidator = [
  check("id")
    .notEmpty()
    .withMessage("Driver ID is required")
    .isInt({ gt: 0 })
    .withMessage("Driver ID must be a valid integer")
    .bail()
    .custom(async (value) => {
      const driver = await db("driver").where({ id: value }).first();
      if (!driver) throw new ErrorAPI("Driver not found", 404);
      return true;
    }),
  check("latitude")
    .notEmpty()
    .withMessage("latitude is required")
    .isFloat({ min: -90, max: 90 })
    .withMessage("latitude must be a valid number between -90 and 90"),

  check("longitude")
    .notEmpty()
    .withMessage("longitude is required")
    .isFloat({ min: -180, max: 180 })
    .withMessage("longitude must be a valid number between -180 and 180"),

  check("timestamp")
    .notEmpty()
    .withMessage("timestamp is required")
    .isISO8601()
    .withMessage("timestamp must be a valid ISO date"),

  runValidation,
];
