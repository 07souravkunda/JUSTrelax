const Queue = require("../models/queueModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.createQueue = catchAsync(async (req, res, next) => {
  const resp = await Queue.create({ userId: req.user.userId, ...req.body });

  res.status(200).json({
    status: "success",
    data: resp,
  });
});

exports.getQueues = catchAsync(async (req, res, next) => {
  const data = await Queue.find({ userId: req.user.userId });

  res.status(200).json({
    status: "success",
    length: data.length,
    data,
  });
});

exports.deleteQueue = catchAsync(async (req, res, next) => {
  const resp = await Queue.findOneAndDelete({ _id: req.params.id });
  res.status(204).json({
    status: "success",
    data: null,
  });
});
