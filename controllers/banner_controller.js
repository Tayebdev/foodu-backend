const bannerModel = require("../models/banner_model");
const asyncHandler = require("express-async-handler");
const ErrorAPI = require("../utils/ErrorAppi");
const {
  createOne,
  deleteOne,
  updateOne,
  getAll,
  getOne,
} = require("./factory_handler");

const createBanner = createOne(bannerModel, "Banner");
const getAllBanner = getAll(bannerModel, "Banner");
const getByIdBanner = getOne(bannerModel, "Banner");
const updateBanner = updateOne(bannerModel, "Banner");
const deleteBanner = deleteOne(bannerModel, "Banner");
const getBannerActive = asyncHandler(async (req, res, next) => {
  const bannerActive = await bannerModel.getActive();
  if (!bannerActive || bannerActive.length === 0) {
    return next(new ErrorAPI("Not Found Banner Active", 404));
  }
  res.status(200).json({
    status: "success",
    data: bannerActive,
  });
});

module.exports = {
  createBanner,
  getAllBanner,
  deleteBanner,
  updateBanner,
  getByIdBanner,
  getBannerActive,
};
