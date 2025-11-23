const express = require("express");
const router = express.Router();
const {
  createRestaurant,
  getAllRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
} = require("../controllers/restaurant_controller");
const {
  createRestaurantValidator,
  updateRestaurantValidator,
  getRestaurantByIdValidator,
  deleteRestaurantValidator,
} = require("../utils/validator/restaurant_validator");

router
  .route("/")
  .post(createRestaurantValidator, createRestaurant)
  .get(getAllRestaurants);
router
  .route("/id/:id")
  .get(getRestaurantByIdValidator, getRestaurantById)
  .put(updateRestaurantValidator, updateRestaurant)
  .delete(deleteRestaurantValidator, deleteRestaurant);

module.exports = router;
