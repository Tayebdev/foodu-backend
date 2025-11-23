const express = require("express");
const router = express.Router();
const {
  createRestaurantPayout,
  getRestaurantPayoutById,
  getAllRestaurantPayouts,
  updateRestaurantPayout,
  deleteRestaurantPayout,
} = require("../controllers/restaurantPayout_controller");
const {
  createRestaurantPayoutValidator,
  updateRestaurantPayoutValidator,
  getPayoutByIdValidator,
  deletePayoutValidator,
} = require("../utils/validator/restaurantPayout_validator");

router
  .route("/")
  .post(createRestaurantPayoutValidator, createRestaurantPayout)
  .get(getAllRestaurantPayouts);

router
  .route("/id/:id")
  .get(getPayoutByIdValidator, getRestaurantPayoutById)
  .put(updateRestaurantPayoutValidator, updateRestaurantPayout)
  .delete(deletePayoutValidator, deleteRestaurantPayout);

module.exports = router;
