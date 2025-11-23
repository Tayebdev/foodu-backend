const BaseModel = require("./base_model");

class restaurantScheduleModel extends BaseModel {
  constructor() {
    super("restaurantSchedule");
  }
  async create(data) {
    if (Array.isArray(data.daysOfWeek)) {
      data.daysOfWeek = JSON.stringify(data.daysOfWeek);
    }
    return await super.create(data);
  }
  async update(id, data) {
    if (Array.isArray(data.daysOfWeek)) {
      data.daysOfWeek = JSON.stringify(data.daysOfWeek);
    }
    return await super.update(id, data);
  }
}

module.exports = new restaurantScheduleModel();
