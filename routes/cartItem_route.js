const express = require("express");
const router = express.Router();
const {
  createCartItem,
  getAllCartItem,
  getCartItemById,
  updateCartItem,
  deleteCartItem,
} = require("../controllers/cartItem_controller");
const {
  createCartItemValidator,
  getCartItemByIdValidator,
  updateCartItemValidator,
  deleteCartItemValidator,
} = require("../utils/validator/cartItem_validator");

router
  .route("/")
  .post(createCartItemValidator, createCartItem)
  .get(getAllCartItem);
router
  .route("/id/:id")
  .get(getCartItemByIdValidator, getCartItemById)
  .put(updateCartItemValidator, updateCartItem)
  .delete(deleteCartItemValidator, deleteCartItem);

module.exports = router;
