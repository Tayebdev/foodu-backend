const mountRoutes = (app) => {
  app.use("/api/v1/user", require("./user_route"));
  app.use("/api/v1/admin", require("./admin_route"));
  app.use("/api/v1/client", require("./client_route"));
  app.use("/api/v1/address", require("./address_route"));
  app.use("/api/v1/restaurantOwner", require("./RestaurantOwner_route"));
  app.use("/api/v1/driver", require("./driver_route"));
  app.use("/api/v1/restaurant", require("./restaurant_route"));
  app.use("/api/v1/menuCategory", require("./menuCategory_route"));
  app.use("/api/v1/menuItem", require("./menuItem_route"));
};

module.exports = mountRoutes;
