const express = require("express");
const router = express.Router();
const {
  createVehicle,
  deleteVehicle,
  updateVehicle,
  getAllVehicles,
  getVehicleById,
} = require("../controllers/vehicle_controller");
const {
  createVehicleValidator,
  deleteVehicleValidator,
  updateVehicleValidator,
  getVehicleByIdValidator,
} = require("../utils/validator/vehicle_validator");

router
  .route("/")
  .post(createVehicleValidator, createVehicle)
  .get(getAllVehicles);
router
  .route("/id/:id")
  .get(getVehicleByIdValidator, getVehicleById)
  .put(updateVehicleValidator, updateVehicle)
  .delete(deleteVehicleValidator, deleteVehicle);

module.exports = router;
