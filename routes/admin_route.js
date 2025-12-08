const express = require("express");
const router = express.Router();
const {
  createAdmin,
  getAllAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin,
} = require("../controllers/admin_controller");
const {
  createAdminValidator,
  getAdminByIdValidator,
  updateAdminValidator,
  deleteAdminValidator,
} = require("../utils/validator/admin_validator");
const { banUser, unbanUser } = require("../controllers/user_controller");

router.route("/").post(createAdminValidator, createAdmin).get(getAllAdmins);
router
  .route("/id/:id")
  .get(getAdminByIdValidator, getAdminById)
  .put(updateAdminValidator, updateAdmin)
  .delete(deleteAdminValidator, deleteAdmin);
router.route("/ban/:id").put(banUser);
router.route("/unban/:id").put(unbanUser);

module.exports = router;
