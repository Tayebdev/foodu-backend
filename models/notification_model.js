const BaseModel = require("./base_model");

class notificationModel extends BaseModel {
  constructor() {
    super("notification");
  }
}

module.exports = new notificationModel();
