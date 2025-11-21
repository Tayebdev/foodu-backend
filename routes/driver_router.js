const express = require("express");
const router = express.Router();
const {
  createDriver,
  getAllDriver,
  getDriverById,
  deleteDriver,
  updateDriver,
} = require("../controllers/driver_controller");
const {
  createDriverValidator,
  getDriverByIdValidator,
  updateDriverValidator,
  deleteDriverValidator,
} = require("../utils/validator/driver_validator");

router.route("/").post(createDriverValidator, createDriver).get(getAllDriver);
router
  .route("/id/:id")
  .get(getDriverByIdValidator, getDriverById)
  .put(updateDriverValidator, updateDriver)
  .delete(deleteDriverValidator, deleteDriver);

module.exports = router;
