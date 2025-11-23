const express = require("express");
const router = express.Router();
const {
  createNotification,
  getAllNotifications,
  getNotificationById,
  updateNotification,
  deleteNotification,
} = require("../controllers/notification_controller");
const {
  createNotificationValidator,
  getNotificationByIdValidator,
  updateNotificationValidator,
  deleteNotificationValidator,
} = require("../utils/validator/notification_validator");

router
  .route("/")
  .post(createNotificationValidator, createNotification)
  .get(getAllNotifications);
router
  .route("/id/:id")
  .get(getNotificationByIdValidator, getNotificationById)
  .put(updateNotificationValidator, updateNotification)
  .delete(deleteNotificationValidator, deleteNotification);

module.exports = router;
