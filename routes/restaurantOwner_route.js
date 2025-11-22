const express = require("express");
const router = express.Router();
const {
  createRestaurantOwner,
  getRestaurantOwnerById,
  getAllRestaurantOwners,
  updateRestaurantOwner,
  deleteRestaurantOwner,
} = require("../controllers/restaurantOwner_controller");
const {
  createRestaurantOwnerValidator,
  getRestaurantOwnerByIdValidator,
  updateRestaurantOwnerValidator,
  deleteRestaurantOwnerValidator,
} = require("../utils/validator/restaurantOwner_validator");

router
  .route("/")
  .post(createRestaurantOwnerValidator, createRestaurantOwner)
  .get(getAllRestaurantOwners);
router
  .route("/id/:id")
  .get(getRestaurantOwnerByIdValidator, getRestaurantOwnerById)
  .put(updateRestaurantOwnerValidator, updateRestaurantOwner)
  .delete(deleteRestaurantOwnerValidator, deleteRestaurantOwner);

module.exports = router;
