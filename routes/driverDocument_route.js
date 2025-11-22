const express = require("express");
const router = express.Router();
const {
  createDriverDocument,
  getDriverDocumentById,
  getAllDriverDocuments,
  updateDriverDocument,
  deleteDriverDocument,
} = require("../controllers/driverDocument_controller");
const {
  createDriverDocumentValidator,
  getDriverDocumentByIdValidator,
  updateDriverDocumentValidator,
  deleteDriverDocumentValidator,
} = require("../utils/validator/driverDocument_validator");

router
  .route("/")
  .post(createDriverDocumentValidator, createDriverDocument)
  .get(getAllDriverDocuments);
router
  .route("/id/:id")
  .get(getDriverDocumentByIdValidator, getDriverDocumentById)
  .put(updateDriverDocumentValidator, updateDriverDocument)
  .delete(deleteDriverDocumentValidator, deleteDriverDocument);

module.exports = router;
