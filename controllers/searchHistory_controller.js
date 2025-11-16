const searchHistoryModel = require("../models/searchHistory_Model");
const {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} = require("./factory_handler");

const createSearchHistory = createOne(searchHistoryModel, "searchHistory");
const getAllSearchHistory = getAll(searchHistoryModel, "searchHistory");
const getByIdSearchHistory = getOne(searchHistoryModel, "searchHistory");
const updateSearchHistory = updateOne(searchHistoryModel, "searchHistory");
const deleteSearchHistory = deleteOne(searchHistoryModel, "searchHistory");

module.exports = {
  createSearchHistory,
  getAllSearchHistory,
  getByIdSearchHistory,
  updateSearchHistory,
  deleteSearchHistory,
};
