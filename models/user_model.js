const db = require("../config/db");
const bcrypt = require("bcryptjs");
const BaseModel = require("./base_model");

class UserModel extends BaseModel {
  constructor() {
    super("user");
  }
  async getByEmail(email) {
    return await db(this.tableName).where({ email }).first();
  }
  async getByPhone(phone) {
    return await db(this.tableName).where({ phone }).first();
  }
  async changePassword(id, password) {
    const hashedPassword = await bcrypt.hash(password, 8);
    return await db(this.tableName)
      .where({ id })
      .update({ password: hashedPassword });
  }
  async create(user) {
    const result = await super.create(user);
    return result[0];
  }
}

module.exports = new UserModel();
