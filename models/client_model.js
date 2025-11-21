const BaseModel = require("./base_model");

class ClientModel extends BaseModel {
  constructor() {
    super("client");
  }
}

module.exports = new ClientModel();
