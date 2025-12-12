const express = require("express");
const router = express.Router();
const {
  createRestaurantOwner,
  getAllRestaurantOwners,
  getRestaurantOwnerById,
  updateRestaurantOwner,
  deleteRestaurantOwner,
} = require("../controllers/RestaurantOwner_controller");

const {
  createRestaurantOwnerValidator,
  getRestaurantOwnerByIdValidator,
  updateRestaurantOwnerValidator,
  deleteRestaurantOwnerValidator,
} = require("../utils/validator/RestaurantOwner_validator");

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
