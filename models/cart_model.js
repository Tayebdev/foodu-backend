const BaseModel = require("./base_model");

class cartModel extends BaseModel {
  constructor() {
    super("cart");
  }
}

module.exports = new cartModel();
