const BaseModel = require("./base_model");

class menuCategoryModel extends BaseModel {
  constructor() {
    super("menuCategory");
  }
}

module.exports = new menuCategoryModel();
