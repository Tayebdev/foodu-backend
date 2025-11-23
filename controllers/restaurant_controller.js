const restaurantModel = require("../models/restaurant_model");
const {
  createOne,
  getOne,
  getAll,
  updateOne,
  deleteOne,
} = require("./factory_handler");

const createRestaurant = createOne(restaurantModel, "restaurant");
const deleteRestaurant = deleteOne(restaurantModel, "restaurant");
const updateRestaurant = updateOne(restaurantModel, "restaurant");
const getRestaurantById = getOne(restaurantModel, "restaurant");
const getAllRestaurants = getAll(restaurantModel, "restaurant");

module.exports = {
    createRestaurant,
    deleteRestaurant,
    updateRestaurant,
    getRestaurantById,
    getAllRestaurants
};