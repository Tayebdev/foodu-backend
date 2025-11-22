const BaseModel = require("./base_model");

class driverDocumentModel extends BaseModel {
  constructor() {
    super("driverDocument");
  }
}

module.exports = new driverDocumentModel();
