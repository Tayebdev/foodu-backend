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

  check("label").notEmpty().withMessage("label is required"),
  check("street").notEmpty().withMessage("street is required"),
  check("building").notEmpty().withMessage("building is required"),
  check("wilaya").notEmpty().withMessage("wilaya is required"),
  check("commune").notEmpty().withMessage("commune is required"),
  check("postalCode").notEmpty().withMessage("postalCode is required"),

  check("latitude")
    .optional()
    .isFloat({ min: -90, max: 90 })
    .withMessage("latitude must be a valid coordinate"),
  check("longitude")
    .optional()
    .isFloat({ min: -180, max: 180 })
    .withMessage("longitude must be a valid coordinate"),

  check("isDefault")
    .optional()
    .isBoolean()
    .withMessage("isDefault must be a boolean"),

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
    .bail()
    .custom(async (value) => {
      const client = await db("client").where({ id: value }).first();
      if (!client) throw new ErrorAPI("Client does not exist", 404);
      return true;
    }),

  check("label").optional().notEmpty().withMessage("label cannot be empty"),
  check("street").optional().notEmpty().withMessage("street cannot be empty"),
  check("building")
    .optional()
    .notEmpty()
    .withMessage("building cannot be empty"),
  check("wilaya").optional().notEmpty().withMessage("wilaya cannot be empty"),
  check("commune").optional().notEmpty().withMessage("commune cannot be empty"),
  check("postalCode")
    .optional()
    .notEmpty()
    .withMessage("postalCode cannot be empty"),

  check("latitude")
    .optional()
    .isFloat({ min: -90, max: 90 })
    .withMessage("latitude must be a valid coordinate"),
  check("longitude")
    .optional()
    .isFloat({ min: -180, max: 180 })
    .withMessage("longitude must be a valid coordinate"),

  check("isDefault")
    .optional()
    .isBoolean()
    .withMessage("isDefault must be a boolean"),

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
