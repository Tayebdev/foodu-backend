const BaseModel = require("./base_model");

class restaurantModel extends BaseModel {
  constructor() {
    super("restaurant");
  }
}

module.exports = new restaurantModel();
