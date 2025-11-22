const { check } = require("express-validator");
const db = require("../../config/db");
const ErrorAPI = require("../../utils/ErrorAppi");
const { runValidation } = require("../../middlewares/validatorMiddleware");

exports.createDriverDocumentValidator = [
  check("driverId")
    .notEmpty()
    .withMessage("driverId is required")
    .isInt({ gt: 0 })
    .withMessage("driverId must be a positive integer")
    .bail()
    .custom(async (value) => {
      const driver = await db("driver").where({ id: value }).first();
      if (!driver) throw new ErrorAPI("Driver not found", 404);
      return true;
    }),

  check("type")
    .notEmpty()
    .withMessage("Document type is required")
    .isIn(["IDCard", "License", "VehiclePapers"])
    .withMessage("Invalid document type"),

  check("picture")
    .notEmpty()
    .withMessage("Picture URL is required")
    .isString()
    .withMessage("Picture must be a string"),

  runValidation,
];

exports.updateDriverDocumentValidator = [
  check("id")
    .notEmpty()
    .withMessage("Document ID is required")
    .isInt({ gt: 0 })
    .withMessage("Document ID must be a positive integer")
    .bail()
    .custom(async (value) => {
      const doc = await db("driverDocument").where({ id: value }).first();
      if (!doc) throw new ErrorAPI("Document not found", 404);
      return true;
    }),

  check("driverId")
    .optional()
    .isInt({ gt: 0 })
    .withMessage("driverId must be a positive integer")
    .custom(async (value) => {
      const driver = await db("driver").where({ id: value }).first();
      if (!driver) throw new ErrorAPI("Driver not found", 404);
      return true;
    }),

  check("type")
    .optional()
    .isIn(["IDCard", "License", "VehiclePapers"])
    .withMessage("Invalid document type"),

  check("picture")
    .optional()
    .isString()
    .withMessage("Picture must be a string"),

  check("verified")
    .optional()
    .isBoolean()
    .withMessage("Verified must be a boolean"),

  runValidation,
];

exports.getDriverDocumentByIdValidator = [
  check("id")
    .notEmpty()
    .withMessage("Document ID is required")
    .isInt({ gt: 0 })
    .withMessage("Document ID must be a positive integer"),
  runValidation,
];

exports.deleteDriverDocumentValidator = [
  check("id")
    .notEmpty()
    .withMessage("Document ID is required")
    .isInt({ gt: 0 })
    .withMessage("Document ID must be a positive integer")
    .bail()
    .custom(async (value) => {
      const doc = await db("driverDocument").where({ id: value }).first();
      if (!doc) throw new ErrorAPI("Document not found", 404);
      return true;
    }),
  runValidation,
];
