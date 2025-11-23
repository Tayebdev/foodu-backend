const { check } = require("express-validator");
const db = require("../../config/db");
const ErrorAPI = require("../../utils/ErrorAppi");
const { runValidation } = require("../../middlewares/validatorMiddleware");

const isValidTime = (value) => {
  const regex = /^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/;
  return regex.test(value);
};

exports.createRestaurantScheduleValidator = [
  check("restaurantId")
    .notEmpty().withMessage("restaurantId is required")
    .isInt({ gt: 0 }).withMessage("restaurantId must be a positive integer")
    .bail()
    .custom(async (value) => {
      const restaurant = await db("restaurant").where({ id: value }).first();
      if (!restaurant) throw new ErrorAPI("Restaurant does not exist", 404);
      return true;
    }),

  check("daysOfWeek")
    .notEmpty().withMessage("daysOfWeek is required")
    .bail()
    .custom((value) => {
      if (!Array.isArray(value)) throw new Error("daysOfWeek must be an array");

      const allowedDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
      value.forEach((day) => {
        if (!allowedDays.includes(day)) {
          throw new Error(`Invalid day: ${day}`);
        }
      });

      return true;
    }),

  check("openTime")
    .optional()
    .custom((value) => {
      if (!isValidTime(value)) {
        throw new Error("openTime must be a valid time (HH:MM or HH:MM:SS)");
      }
      return true;
    }),

  check("closeTime")
    .optional()
    .custom((value) => {
      if (!isValidTime(value)) {
        throw new Error("closeTime must be a valid time (HH:MM or HH:MM:SS)");
      }
      return true;
    }),

  check("isClosed")
    .optional()
    .isBoolean()
    .withMessage("isClosed must be boolean"),

  runValidation,
];

exports.updateRestaurantScheduleValidator = [
  check("id")
    .notEmpty().withMessage("Schedule ID is required")
    .isInt().withMessage("ID must be integer")
    .bail()
    .custom(async (value) => {
      const schedule = await db("restaurantSchedule").where({ id: value }).first();
      if (!schedule) throw new ErrorAPI("Schedule not found", 404);
      return true;
    }),

  check("daysOfWeek")
    .optional()
    .custom((value) => {
      if (!Array.isArray(value)) throw new Error("daysOfWeek must be an array");

      const allowedDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
      value.forEach((day) => {
        if (!allowedDays.includes(day)) {
          throw new Error(`Invalid day: ${day}`);
        }
      });

      return true;
    }),

  check("openTime")
    .optional()
    .custom((value) => {
      if (!isValidTime(value)) {
        throw new Error("openTime must be a valid time (HH:MM or HH:MM:SS)");
      }
      return true;
    }),

  check("closeTime")
    .optional()
    .custom((value) => {
      if (!isValidTime(value)) {
        throw new Error("closeTime must be a valid time (HH:MM or HH:MM:SS)");
      }
      return true;
    }),

  check("isClosed")
    .optional()
    .isBoolean()
    .withMessage("isClosed must be boolean"),

  runValidation,
];

exports.getScheduleByIdValidator = [
  check("id")
    .notEmpty().withMessage("ID is required")
    .isInt().withMessage("ID must be integer"),
  runValidation,
];

exports.deleteScheduleValidator = [
  check("id")
    .notEmpty().withMessage("ID is required")
    .bail()
    .custom(async (value) => {
      const schedule = await db("restaurantSchedule").where({ id: value }).first();
      if (!schedule) throw new ErrorAPI("Schedule not found", 404);
      return true;
    }),
  runValidation,
];
