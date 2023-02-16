const mongoose = require("mongoose");

const storySchema = new mongoose.Schema({
  user: {
    type: Object,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  contents: [Object],
  date: {
    type: Date,
    required: true,
  },
  likes: {
    type: Object,
  },
  comments: [Object],
});

module.exports.Story = mongoose.model("story", storySchema);
