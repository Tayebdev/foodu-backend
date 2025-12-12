const driverModel = require("../models/driver_model");
const asyncHandler = require("express-async-handler");
const ErrorAPI = require("../utils/ErrorAppi");
const {
  createOne,
  getOne,
  updateOne,
  deleteOne,
  getAll
} = require("./factory_handler");

const createDriver = createOne(driverModel, "driver");
const getDriverById = getOne(driverModel, "driver");
const updateDriver = updateOne(driverModel, "driver");
const getAllDrivers = getAll(driverModel, "driver");
const deleteDriver = deleteOne(driverModel, "driver");
const toggleAvailability = asyncHandler(async (req, res, next) => {
  const result = await driverModel.availableDrivers(
    req.params.id,
    req.body.availability
  );
  if (!result) {
    return next(new ErrorAPI("Failed to update availability", 400));
  }
  res.status(200).json({
    status: "success",
    message: "Driver availability updated successfully",
  });
});
const updateLocation=asyncHandler(async(req,res,next)=>{
    const result = await driverModel.updateLocation(
        req.params.id,
        req.body.currentLatitude,
        req.body.currentLongitude,
        req.body.lastLocationUpdate
        );
    if (!result) {
        return next(new ErrorAPI("Failed to update location", 400));
    }
    res.status(200).json({
        status: "success",
        message: "Driver location updated successfully",
    });
});
module.exports = {
  createDriver,
  getDriverById,
  updateDriver,
  deleteDriver,
  toggleAvailability,
  updateLocation,
  getAllDrivers
};
