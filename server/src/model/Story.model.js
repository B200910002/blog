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
  contents: [Object],
  date: {
    type: Date,
    required: true,
  },
  likes: Object,
  comments: [Schema.Types.ObjectId],
});

storySchema.statics.createStory = async function (
  user,
  title,
  contents,
  date,
  likes
) {
  const story = await this.create({
    user: user,
    title: title, 
    contents: contents,
    date: date,
    likes: likes
  });

  return story;
};

module.exports.Story = mongoose.model("story", storySchema);
