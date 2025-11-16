const db = require("../config/db");

const searchHistoryModel = {
  create: async (searchHistory) => {
    return await db("searchHistory").insert(searchHistory);
  },
  getAll: async () => {
    return await db("searchHistory").select("*");
  },
  getOne: async (id) => {
    return await db("searchHistory").where({ id }).first();
  },
  update: async (id, searchHistory) => {
    return db("searchHistory").where({ id }).update(searchHistory);
  },
  delete: async (id) => {
    return db("searchHistory").where({ id }).del();
  },
};

module.exports = searchHistoryModel;
