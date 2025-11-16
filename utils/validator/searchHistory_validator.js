const { check } = require("express-validator");
const db = require("../../config/db");
const ErrorAPI = require("../../utils/ErrorAppi");
const { runValidation } = require("../../middlewares/validatorMiddleware");

exports.createSearchHistoryValidator = [
  check("clientId")
    .notEmpty()
    .withMessage("clientId is required")
    .isInt({ gt: 0 })
    .withMessage("clientId must be a valid integer")
    .bail()
    .custom(async (value) => {
      const client = await db("client").where({ id: value }).first();
      if (!client) throw new ErrorAPI("Client does not exist", 404);
      return true;
    }),

  check("query")
    .optional()
    .isString()
    .withMessage("query must be a string"),

  check("searchedAt")
    .optional()
    .isISO8601()
    .withMessage("searchedAt must be a valid date"),

  runValidation,
];

exports.updateSearchHistoryValidator = [
  check("id")
    .notEmpty()
    .withMessage("History ID is required")
    .bail()
    .custom(async (value) => {
      const history = await db("searchHistory").where({ id: value }).first();
      if (!history) throw new ErrorAPI("Search history entry not found", 404);
      return true;
    }),

  check("clientId")
    .optional()
    .isInt({ gt: 0 })
    .withMessage("clientId must be a valid integer")
    .custom(async (value) => {
      const client = await db("client").where({ id: value }).first();
      if (!client) throw new ErrorAPI("Client does not exist", 404);
      return true;
    }),

  check("query")
    .optional()
    .isString()
    .withMessage("query must be a string"),

  check("searchedAt")
    .optional()
    .isISO8601()
    .withMessage("searchedAt must be a valid date"),

  runValidation,
];

exports.getSearchHistoryByIdValidator = [
  check("id")
    .notEmpty()
    .withMessage("History ID is required")
    .isInt()
    .withMessage("History ID must be an integer"),
  runValidation,
];

exports.deleteSearchHistoryValidator = [
  check("id")
    .notEmpty()
    .withMessage("History ID is required")
    .bail()
    .custom(async (value) => {
      const history = await db("searchHistory").where({ id: value }).first();
      if (!history) throw new ErrorAPI("Search history entry not found", 404);
      return true;
    }),
  runValidation,
];
