const mountRoutes = (app) => {
  app.use("/api/v1/user", require("./user_route"));
  app.use("/api/v1/client", require("./client_route"));
  app.use("/api/v1/address", require("./address_route"));
  app.use("/api/v1/searchHistory", require("./searchHistory_route"));
  app.use("/api/v1/banner", require("./banner_route"));
  app.use("/api/v1/driver", require("./driver_router"));
};

module.exports = mountRoutes;
