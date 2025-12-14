const MenuCategoryModel = require("../models/menuCategory_model");
const ErrorAPI = require("../utils/ErrorAppi");
const asyncHandler = require("express-async-handler");
const {
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne,
} = require("./factory_handler");

const createMenuCategory = createOne(MenuCategoryModel, "Menu Category");
const getAllMenuCategories = getAll(MenuCategoryModel, "Menu Categories");
const getMenuCategoryById = getOne(MenuCategoryModel, "Menu Category");
const updateMenuCategory = updateOne(MenuCategoryModel, "Menu Category");
const deleteMenuCategory = deleteOne(MenuCategoryModel, "Menu Category");
const activateMenuCategory = asyncHandler(async (req, res, next) => {
  const result = await MenuCategoryModel.activate(req.params.id);
  if (!result) {
    return next(new ErrorAPI("Menu Category not activated", 404));
  }
  res.status(200).json({
    status: "success",
    message: "Menu Category is activated",
  });
});
const deactivateMenuCategory = asyncHandler(async (req, res, next) => {
  const result = await MenuCategoryModel.deactivate(req.params.id);
  if (!result) {
    return next(new ErrorAPI("Menu Category not deactivated", 404));
  }
  res.status(200).json({
    status: "success",
    message: "Menu Category is deactivated",
  });
});
const getMenuCategoriesByRestaurant = asyncHandler(async (req, res, next) => {
  const result = await MenuCategoryModel.getByRestaurant(
    req.params.restaurantId
  );
  if (!result || result.length === 0) {
    return next(
      new ErrorAPI("No Menu Categories found for this restaurant", 404)
    );
  }
  res.status(200).json({
    status: "success",
    results: result.length,
    data: result,
  });
});

module.exports = {
  createMenuCategory,
  getAllMenuCategories,
  getMenuCategoryById,
  updateMenuCategory,
  deleteMenuCategory,
  activateMenuCategory,
  deactivateMenuCategory,
  getMenuCategoriesByRestaurant,
};
