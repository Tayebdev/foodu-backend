const BaseModel = require("./base_model");

class SearchHistoryModel extends BaseModel {
  constructor() {
    super("searchHistory");
  }
}

module.exports = new SearchHistoryModel();
