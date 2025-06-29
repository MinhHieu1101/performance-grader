require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");
const chalk = require("chalk");

const authRoutes = require("./src/routes/authRoutes");
const userRoutes = require("./src/routes/userRoutes");
const rewardRoutes = require("./src/routes/rewardRoutes");
const documentRoutes = require("./src/routes/documentRoutes");
const applicationRoutes = require("./src/routes/applicationRoutes");
const uploadRoutes = require("./src/routes/uploadRoutes");
const errorHandler = require("./src/middleware/errorMiddleware");

const app = express();
const port = process.env.PORT || 5000;
const host = process.env.HOST || "localhost";

app.use(helmet());

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

const allowedOrigins = ["http://localhost:5173", "*"];

const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // parse URL-encoded bodies
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/rewards", rewardRoutes);
app.use("/applications", applicationRoutes);
app.use("/documents", documentRoutes);
app.use("/uploads", uploadRoutes);
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
