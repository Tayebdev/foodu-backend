const addressModel = require("../models/address_model");
const {
  createOne,
  deleteOne,
  updateOne,
  getOne,
  getAll,
} = require("./factory_handler");

const createAddress = createOne(addressModel,"address");
const deleteAddress = deleteOne(addressModel, "address");
const updateAddress = updateOne(addressModel, "address");
const getAddressById = getOne(addressModel, "address");
const getAllAddresses = getAll(addressModel, "address");

module.exports = {
  createAddress,
  deleteAddress,
  updateAddress,
  getAddressById,
  getAllAddresses,
};
