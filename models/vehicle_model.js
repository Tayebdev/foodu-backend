const BaseModel = require("./base_model");

class vehicleModel extends BaseModel {
  constructor() {
    super("vehicle");
  }
}

module.exports = new vehicleModel();
