const BaseModel = require("./base_model");

class ClientModel extends BaseModel {
  constructor() {
    super("client");
  }
  async create(data) {
    if (data.favoriteRestaurants && Array.isArray(data.favoriteRestaurants)) {
      data.favoriteRestaurants = JSON.stringify(data.favoriteRestaurants);
    }
    return await super.create(data);
  }
  async update(id, data) {
    if (data.favoriteRestaurants && Array.isArray(data.favoriteRestaurants)) {
      data.favoriteRestaurants = JSON.stringify(data.favoriteRestaurants);
    }
    return await super.update(id, data);
  }
  async getAll() {
    const results = await super.getAll();
    return results.map((client) => {
      if (client.favoriteRestaurants) {
        client.favoriteRestaurants = JSON.parse(client.favoriteRestaurants);
      }
      return client;
    });
  }
}

module.exports = new ClientModel();
