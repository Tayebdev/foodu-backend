const cartModel = require("../models/cart_model");
const {
  createOne,
  deleteOne,
  updateOne,
  getAll,
  getOne,
} = require("./factory_handler");

const createCart = createOne(cartModel, "Cart");
const getAllCart = getAll(cartModel, "Cart");
const getCartById = getOne(cartModel, "Cart");
const updateCart = updateOne(cartModel, "Cart");
const deleteCart = deleteOne(cartModel, "Cart");

module.exports = {
  createCart,
  getAllCart,
  getCartById,
  updateCart,
  deleteCart,
};
