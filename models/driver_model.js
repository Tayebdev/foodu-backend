const BaseModel = require("./base_model");

class DriverModel extends BaseModel {
  constructor() {
    super("driver");
  }
}

module.exports = new DriverModel();
