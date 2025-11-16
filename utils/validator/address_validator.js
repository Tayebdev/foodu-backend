const { check } = require("express-validator");
const db = require("../../config/db");
const ErrorAPI = require("../../utils/ErrorAppi");
const { runValidation } = require("../../middlewares/validatorMiddleware");

exports.createAddressValidator = [
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

  check("label")
    .notEmpty()
    .withMessage("label is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("label must be between 2 and 100 characters"),

  check("wilaya")
    .notEmpty()
    .withMessage("wilaya is required")
    .isString()
    .withMessage("wilaya must be a string"),

  check("commune")
    .notEmpty()
    .withMessage("commune is required")
    .isString()
    .withMessage("commune must be a string"),

  check("street")
    .notEmpty()
    .withMessage("street is required")
    .isString()
    .withMessage("street must be a string"),

  check("latitude")
    .notEmpty()
    .withMessage("latitude is required")
    .isFloat({ min: -90, max: 90 })
    .withMessage("latitude must be a valid coordinate"),

  check("longitude")
    .notEmpty()
    .withMessage("longitude is required")
    .isFloat({ min: -180, max: 180 })
    .withMessage("longitude must be a valid coordinate"),

  runValidation,
];

exports.updateAddressValidator = [
  check("id")
    .notEmpty()
    .withMessage("Address ID is required")
    .bail()
    .custom(async (value) => {
      const address = await db("address").where({ id: value }).first();
      if (!address) throw new ErrorAPI("Address not found", 404);
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

  check("label")
    .optional()
    .isLength({ min: 2, max: 100 })
    .withMessage("label must be between 2 and 100 characters"),

  check("wilaya")
    .optional()
    .isString()
    .withMessage("wilaya must be a string"),

  check("commune")
    .optional()
    .isString()
    .withMessage("commune must be a string"),

  check("street")
    .optional()
    .isString()
    .withMessage("street must be a string"),

  check("latitude")
    .optional()
    .isFloat({ min: -90, max: 90 })
    .withMessage("latitude must be a valid coordinate"),

  check("longitude")
    .optional()
    .isFloat({ min: -180, max: 180 })
    .withMessage("longitude must be a valid coordinate"),

  runValidation,
];

exports.getAddressByIdValidator = [
  check("id")
    .notEmpty()
    .withMessage("Address ID is required")
    .isInt()
    .withMessage("Address ID must be an integer"),
  runValidation,
];

exports.deleteAddressValidator = [
  check("id")
    .notEmpty()
    .withMessage("Address ID is required")
    .bail()
    .custom(async (value) => {
      const address = await db("address").where({ id: value }).first();
      if (!address) throw new ErrorAPI("Address not found", 404);
      return true;
    }),
  runValidation,
];
