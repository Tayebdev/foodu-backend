const adminModel = require("../models/admin_model");
const {
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne,
} = require("./factory_handler");

const createAdmin = createOne(adminModel, "Admin");
const getAllAdmins = getAll(adminModel, "Admins");
const getAdminById = getOne(adminModel, "Admin");
const updateAdmin = updateOne(adminModel, "Admin");
const deleteAdmin = deleteOne(adminModel, "Admin");

module.exports = {
  createAdmin,
  getAllAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin,
};
