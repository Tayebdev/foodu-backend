const commissionModel = require("../models/commission_model");
const {
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne,
} = require("./factory_handler");

const createCommission = createOne(commissionModel, "Commission");
const getAllCommissions = getAll(commissionModel, "Commission");
const getCommissionById = getOne(commissionModel, "Commission");
const updateCommission = updateOne(commissionModel, "Commission");
const deleteCommission = deleteOne(commissionModel, "Commission");

module.exports = {
  createCommission,
  getAllCommissions,
  getCommissionById,
  updateCommission,
  deleteCommission,
};
