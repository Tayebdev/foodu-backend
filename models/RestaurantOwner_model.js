const baseModel = require('./base_model');
class RestaurantOwnerModel extends baseModel {
    constructor() {
        super('restaurantOwner');
    }
}
module.exports = new RestaurantOwnerModel();