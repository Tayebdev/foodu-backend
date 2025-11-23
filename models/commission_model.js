const BaseModel = require("./base_model");

class commissionModel extends BaseModel {
  constructor() {
    super("commission");
  }
}

module.exports = new commissionModel();
