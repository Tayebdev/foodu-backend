const BaseModel = require("./base_model");

class BannerModel extends BaseModel {
  constructor() {
    super("banner");
  }
  async getActive() {
    return await this.db("banner")
      .where({ isActive: true })
      .orderBy("createdAt", "desc");
  }
}

module.exports = new BannerModel();
