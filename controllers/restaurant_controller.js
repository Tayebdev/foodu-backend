const restaurantModel = require("../models/restaurant_model");
const ErrorAPI = require("../utils/ErrorAppi");
const asyncHandler = require("express-async-handler");
const {
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne,
} = require("./factory_handler");

const registerRestaurant = createOne(restaurantModel, "Restaurant");
const getAllRestaurants = getAll(restaurantModel, "Restaurants");
const getRestaurantById = getOne(restaurantModel, "Restaurant");
const updateRestaurant = updateOne(restaurantModel, "Restaurant");
const deleteRestaurant = deleteOne(restaurantModel, "Restaurant");
const updateRestaurantStatus = asyncHandler(async (req, res) => {
  const result = await restaurantModel.updateStatus(
    req.params.id,
    req.body.status
  );
  if (!result) {
    throw new ErrorAPI("Failed to update restaurant status", 500);
  }
  return res.status(200).json({
    status: "success",
    message: "Restaurant status updated successfully",
  });
});
module.exports = {
  registerRestaurant,
  getAllRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
  updateRestaurantStatus,
};
