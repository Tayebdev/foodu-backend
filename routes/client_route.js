const express = require("express");
const router = express.Router();
const {
  createClient,
  getAllClients,
  getClientById,
  deleteClient,
  updateClient,
} = require("../controllers/client_controller");
const {
  createClientValidator,
  updateClientValidator,
  deleteClientValidator,
  getClientByIdValidator,
} = require("../utils/validator/client_validator");

router.route("/").post(createClientValidator, createClient).get(getAllClients);
router
  .route("/:id")
  .get(getClientByIdValidator, getClientById)
  .put(updateClientValidator, updateClient)
  .delete(deleteClientValidator, deleteClient);

module.exports = router;
