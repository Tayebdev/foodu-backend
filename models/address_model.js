const baseModel = require("./base_model");
const db = require("../config/db");

class AddressModel extends baseModel {
  constructor() {
    super("address");
  }
  async setAsDefault(id, clientId) {
    return await db(this.tableName)
      .where({ id, clientId })
      .update({ isDefault: true });
  }
  async getByClientId(clientId) {
    return await db(this.tableName).where({ clientId });
  }
  async getDefault(clientId) {
    return await db(this.tableName)
      .where({ clientId, isDefault: true })
      .first();
  }
}
module.exports = new AddressModel();
