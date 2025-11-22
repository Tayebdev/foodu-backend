const BaseModel = require("./base_model");

class restaurantOwnerModel extends BaseModel {
  constructor() {
    super("restaurantOwner");
  }
}

module.exports = new restaurantOwnerModel();
