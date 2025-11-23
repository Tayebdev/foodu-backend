const restaurantScheduleModel = require("../models/restaurantSchedule_model");
const {
  createOne,
  getOne,
  getAll,
  updateOne,
  deleteOne,
} = require("./factory_handler");

const createRestaurantSchedule = createOne(restaurantScheduleModel, "RestaurantSchedule");
const deleteRestaurantSchedule = deleteOne(restaurantScheduleModel, "RestaurantSchedule");
const updateRestaurantSchedule = updateOne(restaurantScheduleModel, "RestaurantSchedule");
const getRestaurantScheduleById = getOne(restaurantScheduleModel, "RestaurantSchedule");
const getAllRestaurantSchedules = getAll(restaurantScheduleModel, "RestaurantSchedule");

module.exports = {
    createRestaurantSchedule,
    deleteRestaurantSchedule,
    updateRestaurantSchedule,
    getRestaurantScheduleById,
    getAllRestaurantSchedules
};