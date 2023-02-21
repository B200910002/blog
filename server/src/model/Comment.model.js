const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
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
  likes: Schema.Types.ObjectId,
  replys: [Schema.Types.ObjectId],
});

module.exports.Comment = mongoose.model("Comment", commentSchema);
