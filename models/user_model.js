const db = require("../config/db");
const bcrypt = require("bcryptjs");
const UserModel = {
  create: async (user) => {
    const result = await db("user").insert(user);
    return result[0];
  },
  getAll: async () => {
    return await db("user").select("*");
  },
  getById: async (id) => {
    return await db("user").select("*").where({ id }).first();
  },
  getByEmail: async (email) => {
    return await db("user").select("*").where({ email }).first();
  },
  getByPhone: async (phone) => {
    return await db("user").select("*").where({ phone }).first();
  },
  delete: async (id) => {
    return await db("user").where({ id }).del();
  },
  update: async (id, userData) => {
    return await db("user").where({ id }).update(userData);
  },
  changePassword: async (id, password) => {
    return await db("user")
      .where({ id })
      .update({ password: await bcrypt.hash(password, 8) });
  },
};

module.exports = UserModel;
