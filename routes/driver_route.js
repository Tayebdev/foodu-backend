const express = require("express");
const router = express.Router();
const {
  createDriver,
  getDriverById,
  updateDriver,
  deleteDriver,
  toggleAvailability,
  updateLocation,
  getAllDrivers,
} = require("../controllers/driver_controller");
const {
  createDriverValidator,
  getDriverByIdValidator,
  updateDriverValidator,
  deleteDriverValidator,
  toggleAvailabilityValidator,
  updateLocationValidator,
} = require("../utils/validator/driver_validator");

router.route("/").post(createDriverValidator, createDriver).get(getAllDrivers);
router
  .route("/id/:id")
  .get(getDriverByIdValidator, getDriverById)
  .put(updateDriverValidator, updateDriver)
  .delete(deleteDriverValidator, deleteDriver);
router
  .route("/availability/id/:id")
  .patch(toggleAvailabilityValidator, toggleAvailability);
router.route("/location/id/:id").patch(updateLocationValidator, updateLocation);
module.exports = router;
