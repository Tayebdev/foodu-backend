const baseModel = require("./base_model");
const db = require("../config/db");

class driverModel extends baseModel {
  constructor() {
    super("driver");
  }
  async availableDrivers(id, availability) {
    return db(this.tableName)
      .where({ id })
      .update({ availability });
  }
  async updateLocation(id, latitude, longitude, timestamp) {
    return db(this.tableName)
      .where({ id })
      .update({
        currentLatitude: latitude,
        currentLongitude: longitude,
        lastLocationUpdate: timestamp,
      });
  }
}

module.exports = new driverModel();
