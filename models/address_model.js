const BaseModel = require("./base_model");

class AddressModel extends BaseModel {
  constructor() {
    super("address");
  }
}

module.exports = new AddressModel();
