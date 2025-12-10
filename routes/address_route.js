const express = require("express");
const router = express.Router();
const {
  createAddress,
  getAllAddresses,
  getAddressById,
  updateAddress,
  deleteAddress,
  getByClientId,
  getDefaultAddress,
  setAsDefaultAddress,
} = require("../controllers/address_controller");
const {
  createAddressValidator,
  getAddressByIdValidator,
  updateAddressValidator,
  deleteAddressValidator,
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
router.route("/client/:clientId").get(getByClientId);
router.route("/default/:clientId").get(getDefaultAddress);
router.route("/setDefault/:id/client/:clientId").put(setAsDefaultAddress);

module.exports = router;
