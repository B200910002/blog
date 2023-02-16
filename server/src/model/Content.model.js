const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema({
  subTitle: {
    type: String,
  },
  texts: [String],
  photos: [String],
  videos: [String],
});

module.exports.Content = mongoose.model("Content", contentSchema);
