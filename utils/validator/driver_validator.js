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
    .withMessage("verified must be true or false"),

  check("availability")
    .optional()
    .isIn(["Online", "Offline", "Busy"])
    .withMessage("availability must be Online, Offline, or Busy"),

  check("totalTrips")
    .optional()
    .isInt({ min: 0 })
    .withMessage("totalTrips must be a non-negative integer"),

  check("rating")
    .optional()
    .isFloat({ min: 1, max: 5 })
    .withMessage("rating must be a float between 1 and 5"),

  check("latitude")
    .optional()
    .isFloat()
    .withMessage("latitude must be a valid float"),

  check("longitude")
    .optional()
    .isFloat()
    .withMessage("longitude must be a valid float"),

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

  check("verified")
    .optional()
    .isBoolean()
    .withMessage("verified must be true or false"),

  check("availability")
    .optional()
    .isIn(["Online", "Offline", "Busy"])
    .withMessage("availability must be Online, Offline, or Busy"),

  check("totalTrips")
    .optional()
    .isInt({ min: 0 })
    .withMessage("totalTrips must be a non-negative integer"),

  check("rating")
    .optional()
    .isFloat({ min: 1, max: 5 })
    .withMessage("rating must be a float between 1 and 5"),

  check("latitude")
    .optional()
    .isFloat()
    .withMessage("latitude must be a valid float"),

  check("longitude")
    .optional()
    .isFloat()
    .withMessage("longitude must be a valid float"),

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
