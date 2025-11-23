const notificationModel = require("../models/notification_model");
const {
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne,
} = require("./factory_handler");

const createNotification = createOne(notificationModel, "Notification");
const getAllNotifications = getAll(notificationModel, "Notification");
const getNotificationById = getOne(notificationModel, "Notification");
const updateNotification = updateOne(notificationModel, "Notification");
const deleteNotification = deleteOne(notificationModel, "Notification");

module.exports = {
  createNotification,
  getAllNotifications,
  getNotificationById,
  updateNotification,
  deleteNotification,
};
