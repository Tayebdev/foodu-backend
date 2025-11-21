const express = require("express");
const router = express.Router();
const {
  createBanner,
  getAllBanner,
  deleteBanner,
  updateBanner,
  getByIdBanner,
  getBannerActive,
} = require("../controllers/banner_controller");

const {
  createBannerValidator,
  updateBannerValidator,
  getBannerByIdValidator,
  deleteBannerValidator,
} = require("../utils/validator/banner_validator");

router.route("/").post(createBannerValidator, createBanner).get(getAllBanner);
router
  .route("/id/:id")
  .get(getBannerByIdValidator, getByIdBanner)
  .put(updateBannerValidator, updateBanner)
  .delete(deleteBannerValidator, deleteBanner);

router.route("/active").get(getBannerActive);

module.exports = router;
