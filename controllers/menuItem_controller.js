const menuItemModel = require("../models/menuItem_model");
const {
  createOne,
  getOne,
  getAll,
  updateOne,
  deleteOne,
} = require("./factory_handler");

const createMenuItem = createOne(menuItemModel, "MenuItem");
const deleteMenuItem = deleteOne(menuItemModel, "MenuItem");
const updateMenuItem = updateOne(menuItemModel, "MenuItem");
const getMenuItemById = getOne(menuItemModel, "MenuItem");
const getAllMenuItems = getAll(menuItemModel, "MenuItem");

module.exports = {
  createMenuItem,
  deleteMenuItem,
  updateMenuItem,
  getMenuItemById,
  getAllMenuItems,
};
