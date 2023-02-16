const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  user: {
    type: Object,
    required: true,
  },
  text: {
    type: String,
  },
  photo: {
    type: String,
  },
  date: {
    type: Date,
    required: true,
  },
  likes: Object,
  replys: [Object],
});

module.exports.Comment = mongoose.model("Comment", commentSchema);
