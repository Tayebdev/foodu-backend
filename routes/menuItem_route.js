const express = require("express");
const router = express.Router();
const {
  createMenuItem,
  getMenuItemById,
  getAllMenuItems,
  updateMenuItem,
  deleteMenuItem,
} = require("../controllers/menuItem_controller");
const {
  createMenuItemValidator,
  updateMenuItemValidator,
  getMenuItemByIdValidator,
  deleteMenuItemValidator,
} = require("../utils/validator/menuItem_validator");

router
  .route("/")
  .post(createMenuItemValidator, createMenuItem)
  .get(getAllMenuItems);
router
  .route("/id/:id")
  .get(getMenuItemByIdValidator, getMenuItemById)
  .put(updateMenuItemValidator, updateMenuItem)
  .delete(deleteMenuItemValidator, deleteMenuItem);

module.exports = router;
