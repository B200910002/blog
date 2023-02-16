const { Comment } = require("../model/Comment.model");
const { Story } = require("../model/Story.model");

exports.getComments = async (req, res, next) => {
  try {
    const { storyId } = req.params;
    const story = await Story.findById(storyId);
    const comments = [];
    for (com of story.comments) {
      comments.push(await Comment.findById(com));
    }
    res.status(200).json(comments);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.getReplys = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const mainComment = await Comment.findById(commentId);
    const comments = [];
    for (reply of mainComment.replys) {
      comments.push(await Comment.findById(reply));
    }
    res.status(200).json(comments);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.createComment = async (req, res, next) => {
  try {
    const { storyId } = req.params;
    const { text, photo } = req.body;

    const story = await Story.findById(storyId);
    if (!story) {
      throw new Error("Comment must be write on story not found story");
    }
    if (!text && !photo) {
      throw new Error("Comment must be contain text or photo");
    }
    const comment = await Comment.create({
      user: req.user._id,
      date: Date.now(),
      text: text ? text : undefined,
      photo: photo ? photo : undefined,
    });
    story.comments.push(comment._id);
    story.save();
    res.status(200).json(story);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.createReply = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const { text, photo } = req.body;

    const mainComment = await Comment.findById(commentId);
    if (!mainComment) {
      throw new Error("Reply will must be write on comment not found comment");
    }
    if (!text && !photo) {
      throw new Error("Comment must be contain text or photo");
    }
    const comment = await Comment.create({
      user: req.user._id,
      date: Date.now(),
      text: text ? text : undefined,
      photo: photo ? photo : undefined,
    });
    mainComment.replys.push(comment._id);
    mainComment.save();
    res.status(200).json(mainComment);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
