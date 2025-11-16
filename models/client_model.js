const db = require("../config/db");

const ClientModel = {
  create: async (client) => {
    return await db("client").insert(client);
  },
  getAll: async () => {
    return await db("client").select("*");
  },
  getById: async (id) => {
    return await db("client").select("*").where({ id }).first();
  },
  update: async (id, clientData) => {
    return await db("client").where({ id }).update(clientData);
  },
  delete: async (id) => {
    return await db("client").where({ id }).del();
  },
};
module.exports = ClientModel;
