const BaseModel = require("./base_model");
const db = require("../config/db");

class restaurantModel extends BaseModel {
  constructor() {
    super("restaurant");
  }
  async updateStatus(id, status) {
    return db(this.tableName).where({ id }).update({ status });
  }
}

module.exports = new restaurantModel();
