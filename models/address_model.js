const db = require("../config/db");

const addressModel = {
  create: async (addressData) => {
    return await db("address").insert(addressData);
  },
  getById: async (id) => {
    return await db("address").where({ id }).first();
  },
  update: async (id, addressData) => {
    return await db("address").where({ id }).update(addressData);
  },
  getAll: async () => {
    return await db("address").select("*");
  },
  delete: async (id) => {
    return await db("address").where({ id }).del();
  },
};

module.exports = addressModel;
