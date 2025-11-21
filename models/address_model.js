const BaseModel = require("./base_model");

class AddressModel extends BaseModel {
  constructor() {
    super("address"); // table name
  }
}

module.exports = new AddressModel();
