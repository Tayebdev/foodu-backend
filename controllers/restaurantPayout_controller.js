const restaurantPayoutModel = require("../models/restaurantPayout_model");
const {
  createOne,
  getOne,
  getAll,
  updateOne,
  deleteOne,
} = require("./factory_handler");

const createRestaurantPayout = createOne(restaurantPayoutModel, "RestaurantPayout");
const deleteRestaurantPayout = deleteOne(restaurantPayoutModel, "RestaurantPayout");
const updateRestaurantPayout = updateOne(restaurantPayoutModel, "RestaurantPayout");
const getRestaurantPayoutById = getOne(restaurantPayoutModel, "RestaurantPayout");
const getAllRestaurantPayouts = getAll(restaurantPayoutModel, "RestaurantPayout");

module.exports = {
    createRestaurantPayout,
    deleteRestaurantPayout,
    updateRestaurantPayout,
    getRestaurantPayoutById,
    getAllRestaurantPayouts
};