const express = require("express");
const router = express.Router();
const {
  createCart,
  getAllCart,
  getCartById,
  updateCart,
  deleteCart,
} = require("../controllers/cart_controller");
const {
  createCartValidator,
  getCartByIdValidator,
  updateCartValidator,
  deleteCartValidator,
} = require("../utils/validator/cart_validator");

router.route("/").post(createCartValidator, createCart).get(getAllCart);
router
  .route("/id/:id")
  .get(getCartByIdValidator, getCartById)
  .put(updateCartValidator, updateCart)
  .delete(deleteCartValidator, deleteCart);

module.exports = router;
