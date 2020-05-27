const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const queueSchema = new Schema({
  userId: {
    type: String,
    required: [true, "user id not present"]
  },
  createdTime: {
    type: Date,
    default: Date.now()
  },
  name: {
    type: String,
    required: [true, "a name should be given"]
  },
  songList: {
    type: [String],
    required: [true, "should be a songlist"]
  }
});

const queueModel = mongoose.model("Queue", queueSchema);

module.exports = queueModel;
