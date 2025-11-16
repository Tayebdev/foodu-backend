const { check } = require("express-validator");
const db = require("../../config/db");
const ErrorAPI = require("../../utils/ErrorAppi");
const { runValidation } = require("../../middlewares/validatorMiddleware");

exports.createClientValidator = [
  check("userId")
    .notEmpty()
    .withMessage("userId is required")
    .isInt({ gt: 0 })
    .withMessage("userId must be a valid integer")
    .bail()
    .custom(async (value) => {
      const user = await db("user").where({ id: value }).first();
      if (!user) throw new ErrorAPI("User does not exist", 404);
      const existingClient = await db("client")
        .where({ userId: value })
        .first();
      if (existingClient)
        throw new ErrorAPI("Client already exists for this user", 400);

      return true;
    }),

  check("loyaltyPoints")
    .optional()
    .isInt({ min: 0 })
    .withMessage("loyaltyPoints must be a non-negative integer"),

  runValidation,
];

exports.updateClientValidator = [
  check("id")
    .notEmpty()
    .withMessage("Client ID is required")
    .bail()
    .custom(async (value) => {
      const client = await db("client").where({ id: value }).first();
      if (!client) throw new ErrorAPI("Client not found", 404);
      return true;
    }),

  check("loyaltyPoints")
    .optional()
    .isInt({ min: 0 })
    .withMessage("loyaltyPoints must be a non-negative integer"),

  check("userId")
    .optional()
    .isInt()
    .withMessage("userId must be valid")
    .custom(async (value, { req }) => {
      const user = await db("user").where({ id: value }).first();
      if (!user) throw new ErrorAPI("User does not exist", 404);
      const existingClient = await db("client")
        .where({ userId: value })
        .andWhereNot("id", req.params.id)
        .first();

      if (existingClient)
        throw new ErrorAPI("This user already has a client entry", 400);

      return true;
    }),

  runValidation,
];

exports.getClientByIdValidator = [
  check("id")
    .notEmpty()
    .withMessage("Client ID is required")
    .isInt()
    .withMessage("Client ID must be an integer"),
  runValidation,
];

exports.deleteClientValidator = [
  check("id")
    .notEmpty()
    .withMessage("Client ID is required")
    .bail()
    .custom(async (value) => {
      const client = await db("client").where({ id: value }).first();
      if (!client) throw new ErrorAPI("Client not found", 404);
      return true;
    }),
  runValidation,
];
