const { Story } = require("../model/Story.model");
const { Content } = require("../model/Content.model");
const { User } = require("../model/User.model");

exports.getStories = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    const stories = await Story.find({ user: user._id });
    res.status(200).json(stories);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.getByIdStory = async (req, res, next) => {
  try {
    const { storyId } = req.params;
    const story = await Story.findById(storyId);
    res.status(200).json(story);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.createStory = async (req, res, next) => {
  try {
    const { title, contents } = req.body;
    const conts = [];
    for (cont of contents) {
      const content = await Content.create({
        subTitle: cont.subTitle ? cont.subTitle : undefined,
        texts: cont.texts ? cont.texts : undefined,
        photos: cont.photos ? cont.photos : undefined,
        videos: cont.videos ? cont.videos : undefined,
      });
      conts.push(content._id);
    }
    const stories = await Story.create({
      user: req.user._id,
      title: title,
      contents: conts,
      date: Date.now(),
    });

    res.status(200).json(stories);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.editStory = async (req, res, next) => {
  try {
    const { storyId } = req.params;
    const user = req.user;
    const { title, contents } = req.body;
    const story = await Story.findById(storyId);
    if (story.user + "" !== user._id + "") {
      throw new Error("You cannot edit that story, because you not owner");
    }
    story.title = title;
    story.contents = contents;
    story.save();
    res.status(200).json(story);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.deleteStory = async (req, res, next) => {
  try {
    const { storyId } = req.params;
    const user = req.user;
    const story = await Story.findById(storyId);
    if (story.user + "" !== user._id + "") {
      throw new Error("You cannot delete that story, because you not owner");
    }
    story.remove();
    res.status(200).json(story);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
