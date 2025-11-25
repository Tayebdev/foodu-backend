const CartItemItemModel = require("../models/cartItem_model");
const {
  createOne,
  deleteOne,
  updateOne,
  getAll,
  getOne,
} = require("./factory_handler");

const createCartItem = createOne(CartItemItemModel, "CartItem");
const getAllCartItem = getAll(CartItemItemModel, "CartItem");
const getCartItemById = getOne(CartItemItemModel, "CartItem");
const updateCartItem = updateOne(CartItemItemModel, "CartItem");
const deleteCartItem = deleteOne(CartItemItemModel, "CartItem");

module.exports = {
  createCartItem,
  getAllCartItem,
  getCartItemById,
  updateCartItem,
  deleteCartItem,
};
