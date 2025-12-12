const baseModel = require("./base_model");

class driverModel extends baseModel {
  constructor() {
    super("driver");
  }
  async availableDrivers(id, status) {
    return this.knex(this.tableName)
      .where({ id })
      .update({ availability: status });
  }
  async updateLocation(id, latitude, longitude, timestamp) {
    return this.knex(this.tableName)
      .where({ id })
      .update({
        currentLatitude: latitude,
        currentLongitude: longitude,
        lastLocationUpdate: timestamp,
      });
  }
}

module.exports = new driverModel();
