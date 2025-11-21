const db = require("../config/db");

const bannerModel = {
  create: async (banner) => {
    return await db("banner").insert(banner);
  },
  getAll: async () => {
    return await db("banner").select("*");
  },
  getById: async (id) => {
    return await db("banner").select("*").where({ id }).first();
  },
  update: async (id, bannerData) => {
    return await db("banner").where({ id }).update(bannerData);
  },
  delete: async (id) => {
    return await db("banner").where({ id }).del();
  },
  getActive: async () => {
    return await db("banner")
      .where({ isActive: true })
      .orderBy("createdAt", "desc");
  },
};

module.exports = bannerModel;
