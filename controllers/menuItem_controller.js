const MenuItemModel = require("../models/menuItem_model");
const ErrorAPI = require("../utils/ErrorAppi");
const asyncHandler = require("express-async-handler");
const {
  createOne,
  getOne,
  getAll,
  updateOne,
  deleteOne,
} = require("./factory_handler");
const addMenuItem = createOne(MenuItemModel, "MenuItem");
const getAllMenuItem = getAll(MenuItemModel, "MenuItem");
const getByIdMenuItem = getOne(MenuItemModel, "MenuItem");
const deleteMenuItem = deleteOne(MenuItemModel, "MenuItem");
const updateMenuItem = updateOne(MenuItemModel, "MenuItem");
const toggleAvailability = asyncHandler(async (req, res) => {
  const result = await MenuItemModel.toggleAvailability(req.params.id);
  if (!result) {
    throw new ErrorAPI("MenuItem not updated", 404);
  }
  res.status(200).json({
    status: "success",
    message: "MenuItem availability updated successfully",
  });
});
const updatePrice = asyncHandler(async (req, res) => {
  const { price } = req.body;
  const result = await MenuItemModel.updatePrice(req.params.id, price);
  if (!result) {
    throw new ErrorAPI("MenuItem price not updated", 404);
  }
  res.status(200).json({
    status: "success",
    message: "MenuItem price updated successfully",
  });
});
const setDiscount = asyncHandler(async (req, res) => {
  const { discountPrice } = req.body;
  const result = await MenuItemModel.setDiscount(req.params.id, discountPrice);
  if (!result) {
    throw new ErrorAPI("MenuItem discount not applied", 404);
  }
  res.status(200).json({
    status: "success",
    message: "MenuItem discount applied successfully",
  });
});
const removeDiscount = asyncHandler(async (req, res) => {
  const result = await MenuItemModel.removeDiscount(req.params.id);
  if (!result) {
    throw new ErrorAPI("MenuItem discount not removed", 404);
  }
  res.status(200).json({
    status: "success",
    message: "MenuItem discount removed successfully",
  });
});
const getByMenuCategory = asyncHandler(async (req, res) => {
  const items = await MenuItemModel.getByMenuCategory(
    req.params.menuCategoryId
  );
  res.status(200).json({
    status: "success",
    results: items.length,
    data: items,
  });
});

module.exports = {
  addMenuItem,
  getAllMenuItem,
  getByIdMenuItem,
  deleteMenuItem,
  updateMenuItem,
  toggleAvailability,
  updatePrice,
  setDiscount,
  removeDiscount,
  getByMenuCategory,
};
