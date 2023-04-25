const { Story } = require("../model/Story.model");
const { Content } = require("../model/Content.model");
const { User } = require("../model/User.model");
const { UserGroup } = require("../model/UserGroup.model");
const { Comment } = require("../model/Comment.model");

exports.getStories = async (req, res, next) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email: email });
    const stories = await Story.find({ user: user._id });
    for (let story of stories) {
      const contents = [];
      for (let content of story.contents) {
        contents.push(await Content.findById(content._id));
      }
      story.contents = contents;
      const likes = await UserGroup.findById(story.likes);
      story.likes = likes.users;
    }
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
  // console.log(req.user)
  try {
    const { title, contents } = req.body;
    const conts = [];
    for (let cont of contents) {
      const content = await Content.create({
        subTitle: cont.subTitle ? cont.subTitle : undefined,
        texts: cont.texts ? cont.texts : undefined,
        photos: cont.photos ? cont.photos : undefined,
        videos: cont.videos ? cont.videos : undefined,
      });
      conts.push(content._id);
    }
    const likes = await UserGroup.create({});
    const stories = await Story.create({
      user: req.user._id,
      title: title,
      contents: conts,
      date: Date.now(),
      likes: likes._id,
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
    res.status(200).json("Story edited");
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
    res.status(200).json("Story deleted");
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.getStoriesFromFollowing = async (req, res, next) => {
  try {
    const user = req.user;
    const following = await UserGroup.findById(user.following);
    const stories = [];
    for (let u of following.users) {
      const st = await Story.find({ user: u });
      for (let s of st) {
        for (let content of s.contents) {
          const con = await Content.findById(content);
          s.contents = con;
        }
        const dd = await User.findById(s.user);
        s.user = { email: dd.email, name: dd.name, photo: dd.photo };
        const likers = await UserGroup.findById(s.likes);
        s.likes = likers.users;
        stories.push(s);
      }
    }
    res.status(200).json(stories);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.like = async (req, res, next) => {
  try {
    const user = req.user;
    const { storyId } = req.params;
    const story = await Story.findById(storyId);
    if (!story) throw new Error("not found the story");
    const likers = await UserGroup.findById(story.likes);
    if (!likers) throw new Error("not found usergroup likers");
    const alreadyLiked = await likers.users.find(function (element) {
      return element + "" === user._id + "";
    });
    if (alreadyLiked) throw new Error("you already liked");
    likers.users.push(user._id);
    likers.save();
    story.likes = likers.users;
    res.status(200).json(story.likes);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
