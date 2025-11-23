const menuCategoryModel = require("../models/menuCategory_model");
const {
  createOne,
  getOne,
  getAll,
  updateOne,
  deleteOne,
} = require("./factory_handler");

const createMenuCategory = createOne(menuCategoryModel, "MenuCategory");
const deleteMenuCategory = deleteOne(menuCategoryModel, "MenuCategory");
const updateMenuCategory = updateOne(menuCategoryModel, "MenuCategory");
const getMenuCategoryById = getOne(menuCategoryModel, "MenuCategory");
const getAllMenuCategorys = getAll(menuCategoryModel, "MenuCategory");

module.exports = {
  createMenuCategory,
  deleteMenuCategory,
  updateMenuCategory,
  getMenuCategoryById,
  getAllMenuCategorys,
};
