const express = require("express");
const router = express.Router();
const {
  getAllRestaurants,
  getRestaurantById,
  updateRestaurantStatus
} = require("../controllers/restaurant_controller");
const {
  getRestaurantByIdValidator,
  updateRestaurantValidator
} = require("../utils/validator/restaurant_validator");

router.get("/", getAllRestaurants);
router.get("/id/:id", getRestaurantByIdValidator, getRestaurantById);
router.patch('/:id/status', updateRestaurantValidator, updateRestaurantStatus);

module.exports = router;
