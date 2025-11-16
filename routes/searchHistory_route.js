const express = require("express");
const router = express.Router();
const {
  createSearchHistoryValidator,
  updateSearchHistoryValidator,
  getSearchHistoryByIdValidator,
  deleteSearchHistoryValidator,
} = require("../utils/validator/searchHistory_validator");
const {
  createSearchHistory,
  getAllSearchHistory,
  getByIdSearchHistory,
  updateSearchHistory,
  deleteSearchHistory,
} = require("../controllers/searchHistory_controller");

router
  .route("/")
  .post(createSearchHistoryValidator, createSearchHistory)
  .get(getAllSearchHistory);

router
  .route("/id/:id")
  .get(getSearchHistoryByIdValidator, getByIdSearchHistory)
  .put(updateSearchHistoryValidator, updateSearchHistory)
  .delete(deleteSearchHistoryValidator, deleteSearchHistory);

module.exports = router;
