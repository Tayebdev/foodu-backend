const BaseModel = require("./base_model");

class restaurantPayoutModel extends BaseModel {
  constructor() {
    super("restaurantPayout");
  }
}

module.exports = new restaurantPayoutModel();
