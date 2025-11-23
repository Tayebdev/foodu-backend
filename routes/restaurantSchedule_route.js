const { parseFormDataArrays } = require("../middlewares/parseDataMiddlware");
const express = require("express");
const router = express.Router();
const {
  createRestaurantSchedule,
  getRestaurantScheduleById,
  getAllRestaurantSchedules,
  updateRestaurantSchedule,
  deleteRestaurantSchedule,
} = require("../controllers/restaurantSchedule_controller");
const {
  createRestaurantScheduleValidator,
  getScheduleByIdValidator,
  updateRestaurantScheduleValidator,
  deleteScheduleValidator,
} = require("../utils/validator/restaurantSchedule_validator");

router
  .route("/")
  .post(
    parseFormDataArrays,
    createRestaurantScheduleValidator,
    createRestaurantSchedule
  )
  .get(getAllRestaurantSchedules);
router
  .route("/id/:id")
  .get(getScheduleByIdValidator, getRestaurantScheduleById)
  .put(
    parseFormDataArrays,
    updateRestaurantScheduleValidator,
    updateRestaurantSchedule
  )
  .delete(deleteScheduleValidator, deleteRestaurantSchedule);

module.exports = router;
