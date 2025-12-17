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
const {
  createRestaurantValidator,
  deleteRestaurantValidator,
  updateRestaurantValidator,
  getRestaurantByIdValidator,
} = require("../utils/validator/restaurant_validator");
const {
  registerRestaurant,
  updateRestaurant,
  deleteRestaurant,
  getRestaurantById,
} = require("../controllers/restaurant_controller");
const {
  createMenuItemValidator,
  updateMenuItemValidator,
  getMenuItemByIdValidator,
  deleteMenuItemValidator,
} = require("../utils/validator/menuItem_validator");
const {
  addMenuItem,
  getAllMenuItem,
  getByIdMenuItem,
  updateMenuItem,
  deleteMenuItem,
} = require("../controllers/menuItem_controller");
router
  .route("/")
  .post(createRestaurantOwnerValidator, createRestaurantOwner)
  .get(getAllRestaurantOwners);
router
  .route("/id/:id")
  .get(getRestaurantOwnerByIdValidator, getRestaurantOwnerById)
  .put(updateRestaurantOwnerValidator, updateRestaurantOwner)
  .delete(deleteRestaurantOwnerValidator, deleteRestaurantOwner);

router.post("/restaurant", createRestaurantValidator, registerRestaurant);
router
  .route("/restaurant/:id")
  .get(getRestaurantByIdValidator, getRestaurantById)
  .put(updateRestaurantValidator, updateRestaurant)
  .delete(deleteRestaurantValidator, deleteRestaurant);

router
  .route("/menuItem")
  .post(createMenuItemValidator, addMenuItem)
  .get(getAllMenuItem);
router
  .route("/menuItem/:id")
  .get(getMenuItemByIdValidator, getByIdMenuItem)
  .put(updateMenuItemValidator, updateMenuItem)
  .delete(deleteMenuItemValidator, deleteMenuItem);

module.exports = router;
