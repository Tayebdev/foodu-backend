const express = require("express");
const router = express.Router();
const {
  createMenuCategory,
  updateMenuCategory,
  deleteMenuCategory,
  getAllMenuCategorys,
  getMenuCategoryById,
} = require("../controllers/menuCategory_controller");
const {
  createMenuCategoryValidator,
  getMenuCategoryByIdValidator,
  updateMenuCategoryValidator,
  deleteMenuCategoryValidator,
} = require("../utils/validator/menuCategory_validator");

router
  .route("/")
  .post(createMenuCategoryValidator, createMenuCategory)
  .get(getAllMenuCategorys);
router
  .route("/id/:id")
  .get(getMenuCategoryByIdValidator, getMenuCategoryById)
  .put(updateMenuCategoryValidator, updateMenuCategory)
  .delete(deleteMenuCategoryValidator, deleteMenuCategory);

module.exports = router;
