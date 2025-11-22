const restaurantOwnerModel = require("../models/restaurantOwner_model");
const {
  createOne,
  getOne,
  getAll,
  updateOne,
  deleteOne,
} = require("./factory_handler");

const createRestaurantOwner = createOne(restaurantOwnerModel, "restaurantOwner");
const deleteRestaurantOwner = deleteOne(restaurantOwnerModel, "restaurantOwner");
const updateRestaurantOwner = updateOne(restaurantOwnerModel, "restaurantOwner");
const getRestaurantOwnerById = getOne(restaurantOwnerModel, "restaurantOwner");
const getAllRestaurantOwners = getAll(restaurantOwnerModel, "restaurantOwner");

module.exports = {
    createRestaurantOwner,
    deleteRestaurantOwner,
    updateRestaurantOwner,
    getRestaurantOwnerById,
    getAllRestaurantOwners
};