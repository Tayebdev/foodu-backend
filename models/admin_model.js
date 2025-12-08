const BaseModel = require("./base_model");
const db = require("../config/db");

class AdminModel extends BaseModel {
  constructor() {
    super("admin");
  }
  async create(adminData) {
    if (Array.isArray(adminData.permissions)) {
      adminData.permissions = JSON.stringify(adminData.permissions);
    }
    if (Array.isArray(adminData.lastActivityAt)) {
      adminData.lastActivityAt = JSON.stringify(adminData.lastActivityAt);
    }
    const [createdAdmin] = await db(this.tableName).insert(adminData);
    if (createdAdmin.permissions) {
      createdAdmin.permissions = JSON.parse(createdAdmin.permissions);
    }
    if (createdAdmin.lastActivityAt) {
      createdAdmin.lastActivityAt = JSON.parse(createdAdmin.lastActivityAt);
    }
    return createdAdmin;
  }
  async update(id, adminData) {
    if (Array.isArray(adminData.permissions)) {
      adminData.permissions = JSON.stringify(adminData.permissions);
    }
    if (Array.isArray(adminData.lastActivityAt)) {
      adminData.lastActivityAt = JSON.stringify(adminData.lastActivityAt);
    }
    await db(this.tableName).where({ id }).update(adminData);
    return this.getById(id);
  }
  async getAll() {
    const admins = await db(this.tableName).select("*");
    return admins.map((admin) => {
      if (admin.permissions) {
        admin.permissions = JSON.parse(admin.permissions);
      }
      if (admin.lastActivityAt) {
        admin.lastActivityAt = JSON.parse(admin.lastActivityAt);
      }
      return admin;
    });
  }
  async getById(id) {
    const admin = await db(this.tableName).where({ id }).first();
    if (!admin) return null;

    if (admin.permissions) {
      admin.permissions = JSON.parse(admin.permissions);
    }
    if (admin.lastActivityAt) {
      admin.lastActivityAt = JSON.parse(admin.lastActivityAt);
    }
    return admin;
  }
}

module.exports = new AdminModel();
