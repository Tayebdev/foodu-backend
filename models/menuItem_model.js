const db = require("../config/db");
const BaseModel = require("./base_model");

class MenuItemModel extends BaseModel {
  constructor() {
    super("menuItem");
  }
  async toggleAvailability(id) {
    const item = await db(this.tableName).where({ id }).first();
    return db(this.tableName)
      .where({ id })
      .update({ isAvailable: !item.isAvailable });
  }
  async updatePrice(id, price) {
    return db(this.tableName)
      .where({ id })
      .update({ price, discountPrice: null });
  }
  async setDiscount(id, discountPrice) {
    return db(this.tableName).where({ id }).update({ discountPrice });
  }
  async removeDiscount(id) {
    return db(this.tableName).where({ id }).update({ discountPrice: null });
  }
  async getByMenuCategory(menuCategoryId) {
    return db(this.tableName).where({ menuCategoryId }).orderBy("id", "asc");
  }
}

module.exports = new MenuItemModel();
