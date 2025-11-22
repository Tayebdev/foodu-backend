const { check } = require("express-validator");
const db = require("../../config/db");
const ErrorAPI = require("../../utils/ErrorAppi");
const { runValidation } = require("../../middlewares/validatorMiddleware");

exports.createVehicleValidator = [
  check("plateNumber")
    .notEmpty()
    .withMessage("plateNumber is required")
    .isLength({ min: 2, max: 20 })
    .withMessage("plateNumber must be between 2 and 20 characters")
    .bail()
    .custom(async (value) => {
      const existing = await db("vehicle")
        .where({ plateNumber: value })
        .first();
      if (existing)
        throw new ErrorAPI("Vehicle with this plateNumber already exists", 400);
    }),

  check("model")
    .notEmpty()
    .withMessage("model is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("model must be between 2 and 50 characters"),

  check("driverId")
    .notEmpty()
    .withMessage("driverId is required")
    .isInt({ gt: 0 })
    .withMessage("driverId must be a positive integer")
    .bail()
    .custom(async (value) => {
      const driver = await db("driver").where({ id: value }).first();
      if (!driver) throw new ErrorAPI("Driver does not exist", 404);

      const existingVehicle = await db("vehicle")
        .where({ driverId: value })
        .first();
      if (existingVehicle)
        throw new ErrorAPI("Driver already has a vehicle", 400);
    }),

  check("type")
    .optional()
    .isIn(["bike", "ElectricBicycle", "Motorcycle", "Scooter"])
    .withMessage(
      "type must be one of bike, ElectricBicycle, Motorcycle, Scooter"
    ),

  runValidation,
];

exports.updateVehicleValidator = [
  check("id")
    .notEmpty()
    .withMessage("Vehicle ID is required")
    .isInt({ gt: 0 })
    .withMessage("Vehicle ID must be a positive integer")
    .bail()
    .custom(async (value) => {
      const vehicle = await db("vehicle").where({ id: value }).first();
      if (!vehicle) throw new ErrorAPI("Vehicle not found", 404);
    }),

  check("plateNumber")
    .optional()
    .isLength({ min: 2, max: 20 })
    .withMessage("plateNumber must be between 2 and 20 characters")
    .bail()
    .custom(async (value, { req }) => {
      const existing = await db("vehicle")
        .where({ plateNumber: value })
        .andWhereNot("id", req.params.id)
        .first();
      if (existing)
        throw new ErrorAPI("Vehicle with this plateNumber already exists", 400);
    }),

  check("model")
    .optional()
    .isLength({ min: 2, max: 50 })
    .withMessage("model must be between 2 and 50 characters"),

  check("driverId")
    .optional()
    .isInt({ gt: 0 })
    .withMessage("driverId must be a positive integer")
    .bail()
    .custom(async (value, { req }) => {
      const driver = await db("driver").where({ id: value }).first();
      if (!driver) throw new ErrorAPI("Driver does not exist", 404);

      const existingVehicle = await db("vehicle")
        .where({ driverId: value })
        .andWhereNot("id", req.params.id)
        .first();
      if (existingVehicle)
        throw new ErrorAPI("Driver already has a vehicle", 400);
    }),

  check("type")
    .optional()
    .isIn(["bike", "ElectricBicycle", "Motorcycle", "Scooter"])
    .withMessage(
      "type must be one of bike, ElectricBicycle, Motorcycle, Scooter"
    ),

  runValidation,
];

exports.deleteVehicleValidator = [
  check("id")
    .notEmpty()
    .withMessage("Vehicle ID is required")
    .isInt({ gt: 0 })
    .withMessage("Vehicle ID must be a positive integer")
    .bail()
    .custom(async (value) => {
      const vehicle = await db("vehicle").where({ id: value }).first();
      if (!vehicle) throw new ErrorAPI("Vehicle not found", 404);
    }),
  runValidation,
];

exports.getVehicleByIdValidator = [
  check("id")
    .notEmpty()
    .withMessage("Vehicle ID is required")
    .isInt({ gt: 0 })
    .withMessage("Vehicle ID must be a positive integer"),
  runValidation,
];
