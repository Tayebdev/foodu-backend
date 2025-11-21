const express = require("express");
const router = express.Router();
const {
  createAddress,
  deleteAddress,
  updateAddress,
  getAddressById,
  getAllAddresses,
} = require("../controllers/address_controller");
const {
  createAddressValidator,
  updateAddressValidator,
  deleteAddressValidator,
  getAddressByIdValidator,
} = require("../utils/validator/address_validator");

router
  .route("/")
  .post(createAddressValidator, createAddress)
  .get(getAllAddresses);
router
  .route("/id/:id")
  .get(getAddressByIdValidator, getAddressById)
  .put(updateAddressValidator, updateAddress)
  .delete(deleteAddressValidator, deleteAddress);

module.exports = router;
