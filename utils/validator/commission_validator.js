const { check } = require("express-validator");
const db = require("../../config/db");
const ErrorAPI = require("../../utils/ErrorAppi");
const { runValidation } = require("../../middlewares/validatorMiddleware");

exports.createCommissionValidator = [
  check("entityType")
    .notEmpty()
    .withMessage("entityType is required")
    .isIn(["Driver", "Restaurant"])
    .withMessage("entityType must be either 'Driver' or 'Restaurant'"),

  check("entityId")
    .notEmpty()
    .withMessage("entityId is required")
    .isInt({ gt: 0 })
    .withMessage("entityId must be a valid integer")
    .bail()
    .custom(async (value, { req }) => {
      const table = req.body.entityType === "Driver" ? "driver" : "restaurant";
      const entity = await db(table).where({ id: value }).first();
      if (!entity)
        throw new ErrorAPI(`${req.body.entityType} does not exist`, 404);
      return true;
    }),

  check("amountDue")
    .notEmpty()
    .withMessage("amountDue is required")
    .isFloat({ gt: 0 })
    .withMessage("amountDue must be a positive number"),

  check("dueDate")
    .notEmpty()
    .withMessage("dueDate is required")
    .isISO8601()
    .withMessage("dueDate must be a valid date"),

  runValidation,
];

exports.updateCommissionValidator = [
  check("id")
    .notEmpty()
    .withMessage("Commission ID is required")
    .bail()
    .custom(async (value) => {
      const commission = await db("commission").where({ id: value }).first();
      if (!commission) throw new ErrorAPI("Commission not found", 404);
      return true;
    }),

  check("entityType")
    .optional()
    .isIn(["Driver", "Restaurant"])
    .withMessage("entityType must be either 'Driver' or 'Restaurant'"),

  check("entityId")
    .optional()
    .isInt({ gt: 0 })
    .withMessage("entityId must be a valid integer")
    .bail()
    .custom(async (value, { req }) => {
      if (req.body.entityType) {
        const table =
          req.body.entityType === "Driver" ? "driver" : "restaurant";
        const entity = await db(table).where({ id: value }).first();
        if (!entity)
          throw new ErrorAPI(`${req.body.entityType} does not exist`, 404);
      }
      return true;
    }),

  check("amountDue")
    .optional()
    .isFloat({ gt: 0 })
    .withMessage("amountDue must be a positive number"),

  check("status")
    .optional()
    .isIn(["Pending", "Paid", "Overdue", "Blocked"])
    .withMessage("status must be Pending, Paid, Overdue, or Blocked"),

  check("dueDate")
    .optional()
    .isISO8601()
    .withMessage("dueDate must be a valid date"),
  check("paidAt")
    .optional()
    .isISO8601()
    .withMessage("paidAt must be a valid date"),

  runValidation,
];

exports.getCommissionByIdValidator = [
  check("id")
    .notEmpty()
    .withMessage("Commission ID is required")
    .isInt()
    .withMessage("Commission ID must be an integer"),
  runValidation,
];

exports.deleteCommissionValidator = [
  check("id")
    .notEmpty()
    .withMessage("Commission ID is required")
    .bail()
    .custom(async (value) => {
      const commission = await db("commission").where({ id: value }).first();
      if (!commission) throw new ErrorAPI("Commission not found", 404);
      return true;
    }),
  runValidation,
];
