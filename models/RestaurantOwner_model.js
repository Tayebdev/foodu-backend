const baseModel = require('./Base_model');
class RestaurantOwnerModel extends baseModel {
    constructor() {
        super('restaurantOwner');
    }
}
module.exports = new RestaurantOwnerModel();