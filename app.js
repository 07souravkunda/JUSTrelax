const express = require("express");
const cors = require("cors");
const app = express();
const audioRouter = require("./router/audioRouter");
const userRouter = require("./router/userRouter");
const queueRouter = require("./router/queueRouter");
// const uploadRouter = require("./router/uploadRouter");
const cookieParser = require("cookie-parser");
const AppError = require("./utils/appError");
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  })
);
app.use((req, res, next) => {
  if (req.cookies.jwt) {
    console.log(req.cookies.jwt);
    req.headers.authorization = `Bearer ${req.cookies.jwt}`;
  }
  next();
});

app.use("/", (req, res, next) => {
  res.status(200).json({
    status: "success",
    data: "this is main route",
  });
});

app.use("/api/v1/audio", audioRouter);

app.use("/api/v1/users", userRouter);

app.use("/api/v1/queue", queueRouter);

// app.use("/api/v1/upload", uploadRouter);

app.use("*", (req, res, next) => {
  console.log("hello");
  next(new AppError("this route not present", 404));
});

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

module.exports = app;
