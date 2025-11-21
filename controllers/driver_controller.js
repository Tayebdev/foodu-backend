const driverModel = require("../models/driver_model");
const {
  createOne,
  deleteOne,
  updateOne,
  getAll,
  getOne,
} = require("./factory_handler");

const createDriver = createOne(driverModel, "Driver");
const getAllDriver = getAll(driverModel, "Driver");
const getDriverById = getOne(driverModel, "Driver");
const updateDriver = updateOne(driverModel, "Driver");
const deleteDriver = deleteOne(driverModel, "Driver");

module.exports = {
  createDriver,
  getAllDriver,
  getDriverById,
  updateDriver,
  deleteDriver,
};
