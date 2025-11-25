const BaseModel = require("./base_model");

class cartItemModel extends BaseModel {
  constructor() {
    super("cartItem");
  }
}

module.exports = new cartItemModel();
