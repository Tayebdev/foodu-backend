const AddressModel = require("../models/address_model");
const ErrorAPI = require("../utils/ErrorAppi");
const asyncHandler = require("express-async-handler");
const {
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne,
} = require("./factory_handler");

const createAddress = createOne(AddressModel, "address");
const getAllAddresses = getAll(AddressModel, "addresses");
const getAddressById = getOne(AddressModel, "address");
const updateAddress = updateOne(AddressModel, "address");
const deleteAddress = deleteOne(AddressModel, "address");
const getByClientId = asyncHandler(async (req, res, next) => {
    const result =await AddressModel.getByClientId(req.params.clientId);
    if(!result || result.length===0){
        return next(new ErrorAPI("No addresses found for this client",404));
    }
    res.status(200).json({
        status:"success",
        data:result
    });
});
const getDefaultAddress = asyncHandler(async (req, res, next) => {
    const result =await AddressModel.getDefault(req.params.clientId);
    if(!result){
        return next(new ErrorAPI("No default address found for this client",404));
    }
    res.status(200).json({
        status:"success",
        data:result
    });
});
const setAsDefaultAddress = asyncHandler(async (req, res, next) => {
    const {id, clientId} = req.params;
    const result =await AddressModel.setAsDefault(id, clientId);
    if(!result){
        return next(new ErrorAPI("Failed to set address as default",400));
    }
    res.status(200).json({
        status:"success",
        message:"Address set as default successfully"
    });
});

module.exports = {
  createAddress,
  getAllAddresses,
  getAddressById,
  updateAddress,
  deleteAddress,
  getByClientId,
  getDefaultAddress,
  setAsDefaultAddress
};
