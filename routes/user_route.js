const express = require("express");
const router = express.Router();
const {
  getByEmailValidator,
  changePasswordValidator,
  createUserValidator,
  deleteUserValidator,
  updateUserValidator,
  getByPhoneValidator,
} = require("../utils/validator/user_validator");
const {
  getAllUsers,
  createUser,
  getUserById,
  getUserByPhone,
  getUserByEmail,
  deleteUser,
  updateUser,
  changePasswordUser,
  activateUser,
  deactivateUser,
  banUser,
  unbanUser,
} = require("../controllers/user_controller");

router.route("/").post(createUserValidator, createUser).get(getAllUsers);
router
  .route("/id/:id")
  .get(getUserById)
  .put(updateUserValidator, updateUser)
  .delete(deleteUserValidator, deleteUser);
router.put("/:id/changePassword", changePasswordValidator, changePasswordUser);
router.route("/phone/:phone").get(getByPhoneValidator, getUserByPhone);
router.route("/email/:email").get(getByEmailValidator, getUserByEmail);
router.route("/ban/:id").put(banUser);
router.route("/unban/:id").put(unbanUser);
router.route("/activate/:id").put(activateUser);
router.route("/deactivate/:id").put(deactivateUser);
module.exports = router;
