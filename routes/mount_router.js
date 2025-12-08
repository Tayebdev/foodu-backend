const mountRoutes = (app) => {
  app.use("/api/v1/user", require("./user_route"));
  app.use("/api/v1/admin", require("./admin_route"));
  app.use("/api/v1/client", require("./client_route"));
  app.use("/api/v1/address", require("./address_route"));
  app.use("/api/v1/searchHistory", require("./searchHistory_route"));
  app.use("/api/v1/banner", require("./banner_route"));
  app.use("/api/v1/driver", require("./driver_router"));
  app.use("/api/v1/vehicle", require("./vehicle_route"));
  app.use("/api/v1/driverDocument", require("./driverDocument_route"));
  app.use("/api/v1/restaurantOwner", require("./restaurantOwner_route"));
  app.use("/api/v1/restaurant", require("./restaurant_route"));
  app.use("/api/v1/restaurantSchedule", require("./restaurantSchedule_route"));
  app.use("/api/v1/restaurantPayout", require("./restaurantPayout_route"));
  app.use("/api/v1/menuCategory", require("./menuCategory_route"));
  app.use("/api/v1/menuItem", require("./menuItem_route"));
  app.use("/api/v1/commission", require("./commission_route"));
  app.use("/api/v1/notification", require("./notification_route"));
  app.use("/api/v1/cart", require("./cart_route"));
  app.use("/api/v1/cartItem", require("./cartItem_route"));
};

module.exports = mountRoutes;
