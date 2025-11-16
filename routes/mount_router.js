const mountRoutes = (app) => {
app.use("/api/v1/user", require("./user_route"));
app.use("/api/v1/client", require("./client_route"));
app.use("/api/v1/address", require("./address_route"));
};

module.exports = mountRoutes;