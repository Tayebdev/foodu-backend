const express = require("express");
const router = express.Router();
const {
  createCommission,
  getCommissionById,
  getAllCommissions,
  updateCommission,
  deleteCommission,
} = require("../controllers/commission_controller");
const {
  createCommissionValidator,
  getCommissionByIdValidator,
  updateCommissionValidator,
  deleteCommissionValidator,
} = require("../utils/validator/commission_validator");

router
  .route("/")
  .post(createCommissionValidator, createCommission)
  .get(getAllCommissions);
router
  .route("/id/:id")
  .get(getCommissionByIdValidator, getCommissionById)
  .put(updateCommissionValidator, updateCommission)
  .delete(deleteCommissionValidator, deleteCommission);

module.exports = router;
