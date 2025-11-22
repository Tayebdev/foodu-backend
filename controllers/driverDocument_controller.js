const driverDocumentModel = require("../models/driverDocument_model");
const {
  createOne,
  deleteOne,
  updateOne,
  getOne,
  getAll,
} = require("./factory_handler");

const createDriverDocument = createOne(driverDocumentModel, "driverDocument");
const deleteDriverDocument = deleteOne(driverDocumentModel, "driverDocument");
const updateDriverDocument = updateOne(driverDocumentModel, "driverDocument");
const getDriverDocumentById = getOne(driverDocumentModel, "driverDocument");
const getAllDriverDocuments = getAll(driverDocumentModel, "driverDocument");

module.exports = {
  createDriverDocument,
  deleteDriverDocument,
  updateDriverDocument,
  getAllDriverDocuments,
  getDriverDocumentById,
};
