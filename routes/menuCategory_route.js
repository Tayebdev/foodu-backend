const express = require("express");
const router = express.Router();
const {
  createMenuCategory,
  getAllMenuCategories,
  getMenuCategoryById,
  updateMenuCategory,
  deleteMenuCategory,
  activateMenuCategory,
  deactivateMenuCategory,
  getMenuCategoriesByRestaurant,
} = require("../controllers/menuCategory_controller");
const {
  createMenuCategoryValidator,
  deleteMenuCategoryValidator,
  updateMenuCategoryValidator,
  getMenuCategoryByIdValidator,
  getMenuCategoriesByRestaurantValidator,
} = require("../utils/validator/menuCategory_validator");

router
  .route("/")
  .post(createMenuCategoryValidator, createMenuCategory)
  .get(getAllMenuCategories);
router
  .route("/id/:id")
  .get(getMenuCategoryByIdValidator, getMenuCategoryById)
  .put(updateMenuCategoryValidator, updateMenuCategory)
  .delete(deleteMenuCategoryValidator, deleteMenuCategory);
router.route("/activate/:id").patch(activateMenuCategory);
router.route("/deactivate/:id").patch(deactivateMenuCategory);
router
  .route("/restaurant/:restaurantId")
  .get(getMenuCategoriesByRestaurantValidator, getMenuCategoriesByRestaurant);

module.exports = router;
