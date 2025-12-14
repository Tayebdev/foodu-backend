const baseModel = require("./base_model");
const db = require("../config/db");

class MenuCategoryModel extends baseModel {
  constructor() {
    super("menuCategory");
  }
  async activate(id) {
    return db(this.tableName).where({ id }).update({ isActive: true });
  }
  async deactivate(id) {
    return db(this.tableName).where({ id }).update({ isActive: false });
  }
  async getByRestaurant(restaurantId) {
    return db(this.tableName).where({ restaurantId });
  }
}

module.exports = new MenuCategoryModel();
