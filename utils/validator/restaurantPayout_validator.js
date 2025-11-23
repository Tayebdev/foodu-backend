const { check } = require("express-validator");
const db = require("../../config/db");
const ErrorAPI = require("../../utils/ErrorAppi");
const { runValidation } = require("../../middlewares/validatorMiddleware");

exports.createRestaurantPayoutValidator = [
  check("restaurantId")
    .notEmpty()
    .withMessage("Restaurant ID is required")
    .isInt({ gt: 0 })
    .withMessage("Restaurant ID must be a positive integer")
    .bail()
    .custom(async (value) => {
      const restaurant = await db("restaurant").where({ id: value }).first();
      if (!restaurant) throw new ErrorAPI("Restaurant not found", 404);
      return true;
    }),

  check("driverId")
    .optional()
    .isInt({ gt: 0 })
    .withMessage("Driver ID must be a positive integer")
    .bail()
    .custom(async (value) => {
      const driver = await db("driver").where({ id: value }).first();
      if (!driver) throw new ErrorAPI("Driver not found", 404);
      return true;
    }),

  check("totalSales")
    .notEmpty()
    .withMessage("Total sales is required")
    .isFloat({ min: 0 })
    .withMessage("Total sales must be a positive number"),

  check("commissionRate")
    .notEmpty()
    .withMessage("Commission rate is required")
    .isFloat({ min: 0 })
    .withMessage("Commission rate must be a positive number"),

  check("commissionAmount")
    .notEmpty()
    .withMessage("Commission amount is required")
    .isFloat({ min: 0 })
    .withMessage("Commission amount must be a positive number"),

  check("netAmount")
    .notEmpty()
    .withMessage("Net amount is required")
    .isFloat({ min: 0 })
    .withMessage("Net amount must be a positive number"),

  check("status")
    .notEmpty()
    .withMessage("Status is required")
    .isIn(["Pending", "Sent", "Failed", "InTransit"])
    .withMessage("Status must be one of: Pending, Sent, Failed, InTransit"),

  check("periodStart")
    .notEmpty()
    .withMessage("Period start date is required")
    .isISO8601()
    .withMessage("Period start must be a valid date"),

  check("periodEnd")
    .notEmpty()
    .withMessage("Period end date is required")
    .isISO8601()
    .withMessage("Period end must be a valid date"),

  check("sentAt")
    .optional()
    .isISO8601()
    .withMessage("Sent date must be a valid date"),

  runValidation,
];

exports.updateRestaurantPayoutValidator = [
  check("id")
    .notEmpty()
    .withMessage("Payout ID is required")
    .isInt({ gt: 0 })
    .withMessage("Payout ID must be a positive integer")
    .bail()
    .custom(async (value) => {
      const payout = await db("restaurantPayout").where({ id: value }).first();
      if (!payout) throw new ErrorAPI("Restaurant payout not found", 404);
      return true;
    }),

  check("driverId")
    .optional()
    .isInt({ gt: 0 })
    .withMessage("Driver ID must be a positive integer")
    .bail()
    .custom(async (value) => {
      const driver = await db("driver").where({ id: value }).first();
      if (!driver) throw new ErrorAPI("Driver not found", 404);
      return true;
    }),

  check("totalSales")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Total sales must be a positive number"),

  check("commissionRate")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Commission rate must be a positive number"),

  check("commissionAmount")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Commission amount must be a positive number"),

  check("netAmount")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Net amount must be a positive number"),

  check("status")
    .optional()
    .isIn(["Pending", "Sent", "Failed", "InTransit"])
    .withMessage("Status must be one of: Pending, Sent, Failed, InTransit"),

  check("periodStart")
    .optional()
    .isISO8601()
    .withMessage("Period start must be a valid date"),

  check("periodEnd")
    .optional()
    .isISO8601()
    .withMessage("Period end must be a valid date"),

  check("sentAt")
    .optional()
    .isISO8601()
    .withMessage("Sent date must be a valid date"),

  runValidation,
];

exports.getPayoutByIdValidator = [
  check("id")
    .notEmpty()
    .withMessage("Payout ID is required")
    .isInt({ gt: 0 })
    .withMessage("Payout ID must be a positive integer"),
  runValidation,
];

exports.deletePayoutValidator = [
  check("id")
    .notEmpty()
    .withMessage("Payout ID is required")
    .isInt({ gt: 0 })
    .withMessage("Payout ID must be a positive integer")
    .bail()
    .custom(async (value) => {
      const payout = await db("restaurantPayout").where({ id: value }).first();
      if (!payout) throw new ErrorAPI("Restaurant payout not found", 404);
      return true;
    }),
  runValidation,
];
