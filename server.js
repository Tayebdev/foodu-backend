const express = require("express");
const path = require("path");
const morgan = require("morgan");
const db = require("./config/db");
const ErrorAPI = require("./utils/ErrorAppi");
const GlobalError = require("./middlewares/globalError");
require("dotenv").config();

const userRoutes = require("./routes/user_route");

const app = express();

app.use(express.json());

app.use("/upload", express.static(path.join(__dirname, "uploads")));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`✅ Mode: ${process.env.NODE_ENV}`);
}

app.use("/api/v1/user", userRoutes);

app.use((req, res, next) => {
  next(new ErrorAPI(`Can't find ${req.originalUrl} on the server`, 400));
});

app.use(GlobalError);

const PORT = process.env.SERVER_PORT || 8000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
