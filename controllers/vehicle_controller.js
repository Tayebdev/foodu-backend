const vehicleModel = require("../models/vehicle_model");
const {
  createOne,
  deleteOne,
  updateOne,
  getOne,
  getAll,
} = require("./factory_handler");

const createVehicle = createOne(vehicleModel, "Vehicle");
const deleteVehicle = deleteOne(vehicleModel, "Vehicle");
const updateVehicle = updateOne(vehicleModel, "Vehicle");
const getVehicleById = getOne(vehicleModel, "Vehicle");
const getAllVehicles = getAll(vehicleModel, "Vehicle");

module.exports = {
  createVehicle,
  deleteVehicle,
  updateVehicle,
  getVehicleById,
  getAllVehicles,
};
