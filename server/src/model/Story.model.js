const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const storySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  contents: [Schema.Types.ObjectId],
  date: {
    type: Date,
    required: true,
  },
  likes: Schema.Types.ObjectId,
  comments: [Schema.Types.ObjectId],
});

module.exports.Story = mongoose.model("story", storySchema);
