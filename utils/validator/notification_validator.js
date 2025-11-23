const { check } = require("express-validator");
const db = require("../../config/db");
const ErrorAPI = require("../../utils/ErrorAppi");
const { runValidation } = require("../../middlewares/validatorMiddleware");

exports.createNotificationValidator = [
  check("userId")
    .notEmpty()
    .withMessage("userId is required")
    .isInt({ gt: 0 })
    .withMessage("userId must be a valid integer")
    .bail()
    .custom(async (value) => {
      const user = await db("user").where({ id: value }).first();
      if (!user) throw new ErrorAPI("User does not exist", 404);
      return true;
    }),

  check("title").notEmpty().withMessage("Title is required"),
  check("body").notEmpty().withMessage("Body is required"),

  check("isRead")
    .optional()
    .isBoolean()
    .withMessage("isRead must be true or false"),

  runValidation,
];

exports.updateNotificationValidator = [
  check("id")
    .notEmpty()
    .withMessage("Notification ID is required")
    .isInt({ gt: 0 })
    .withMessage("Notification ID must be a valid integer")
    .bail()
    .custom(async (value) => {
      const notification = await db("notification").where({ id: value }).first();
      if (!notification) throw new ErrorAPI("Notification not found", 404);
      return true;
    }),

  check("title").optional().notEmpty().withMessage("Title cannot be empty"),
  check("body").optional().notEmpty().withMessage("Body cannot be empty"),
  check("isRead").optional().isBoolean().withMessage("isRead must be true or false"),

  runValidation,
];

exports.getNotificationByIdValidator = [
  check("id")
    .notEmpty()
    .withMessage("Notification ID is required")
    .isInt({ gt: 0 })
    .withMessage("Notification ID must be a valid integer"),
  runValidation,
];

exports.deleteNotificationValidator = [
  check("id")
    .notEmpty()
    .withMessage("Notification ID is required")
    .isInt({ gt: 0 })
    .withMessage("Notification ID must be a valid integer")
    .bail()
    .custom(async (value) => {
      const notification = await db("notification").where({ id: value }).first();
      if (!notification) throw new ErrorAPI("Notification not found", 404);
      return true;
    }),
  runValidation,
];
