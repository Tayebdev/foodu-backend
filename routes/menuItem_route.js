const express = require("express");
const router = express.Router();
const {
  toggleAvailability,
  removeDiscount,
  getByMenuCategory,
  setDiscount,
  updatePrice,
} = require("../controllers/menuItem_controller");
const {
  toggleAvailabilityValidator,
  removeDiscountValidator,
  getByMenuCategoryValidator,
  setDiscountValidator,
  updateMenuItemPriceValidator,
} = require("../utils/validator/menuItem_validator");

router
  .route("/toggleAvailability/:id")
  .patch(toggleAvailabilityValidator, toggleAvailability);
router
  .route("/removeDiscount/:id")
  .patch(removeDiscountValidator, removeDiscount);
router
  .route("/getByMenuCategory/:menuCategoryId")
  .get(getByMenuCategoryValidator, getByMenuCategory);
router.route("/setDiscount/:id").patch(setDiscountValidator, setDiscount);
router
  .route("/updatePrice/:id")
  .patch(updateMenuItemPriceValidator, updatePrice);

module.exports = router;
