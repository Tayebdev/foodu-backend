const BaseModel = require("./base_model");

class menuItemModel extends BaseModel {
  constructor() {
    super("menuItem");
  }
}

module.exports = new menuItemModel();
