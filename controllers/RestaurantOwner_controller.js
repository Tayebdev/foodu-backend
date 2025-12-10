const RestaurantOwnerModel = require("../models/RestaurantOwner_model");
const {
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne,
} = require("./factory_handler");

const createRestaurantOwner = createOne(
  RestaurantOwnerModel,
  "RestaurantOwner"
);
const getAllRestaurantOwners = getAll(RestaurantOwnerModel, "RestaurantOwners");
const getRestaurantOwnerById = getOne(RestaurantOwnerModel, "RestaurantOwner");
const updateRestaurantOwner = updateOne(
  RestaurantOwnerModel,
  "RestaurantOwner"
);
const deleteRestaurantOwner = deleteOne(
  RestaurantOwnerModel,
  "RestaurantOwner"
);

module.exports = {
  createRestaurantOwner,
  getAllRestaurantOwners,
  getRestaurantOwnerById,
  updateRestaurantOwner,
  deleteRestaurantOwner,
};
