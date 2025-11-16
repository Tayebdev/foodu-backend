const ClientModel = require("../models/client_model");
const {
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne,
} = require("./factory_handler");

const createClient = createOne(ClientModel, "client");
const getAllClients = getAll(ClientModel, "client");
const getClientById = getOne(ClientModel, "client");
const updateClient = updateOne(ClientModel, "client");
const deleteClient = deleteOne(ClientModel, "client");

module.exports = {
  createClient,
  getAllClients,
  getClientById,
  updateClient,
  deleteClient,
};
