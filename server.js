require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");
const chalk = require("chalk");

const authRoutes = require("./src/routes/authRoutes");
const errorHandler = require("./src/middleware/errorMiddleware");

const port = process.env.PORT || 5000;
const host = process.env.HOST || "localhost";

const allowedOrigins = ["http://localhost:5173", "*"];

const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
};

const app = express();

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // parse URL-encoded bodies
app.use(cookieParser());

app.use("/auth", authRoutes);

app.use(errorHandler);

app.listen(port, host, () => {
  console.log(
    `${chalk.cyan("Backend")} running in ${chalk.yellow(
      process.env.NODE_ENV
    )} environment and ready at http://${chalk.green(host)}:${chalk.green(
      port
    )}`
  );
});
