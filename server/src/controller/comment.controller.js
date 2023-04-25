const { Comment } = require("../model/Comment.model");
const { Story } = require("../model/Story.model");
const { User } = require("../model/User.model");

exports.getComments = async (req, res, next) => {
  try {
    const { storyId } = req.params;
    const story = await Story.findById(storyId);
    const comments = [];
    for (com of story.comments) {
      const comment = await Comment.findById(com);
      const user = await User.findById(comment.user);
      comment.user = { email: user.email, name: user.name, photo: user.photo };
      comments.push(comment);
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

exports.editComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const { text, photo } = req.body;
    const user = req.user;
    const comment = await Comment.findById(commentId);
    if (!text && !photo) {
      throw new Error("Comment must be contain text or photo");
    }
    if (comment.user + "" !== user._id + "") {
      throw new Error("You cannot edit that comment, because you not owner");
    }
    comment.text = text ? text : undefined;
    comment.photo = photo ? photo : undefined;
    comment.date = Date.now();
    comment.save();
    res.status(200).json("Comment edited");
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.deleteComment = async (req, res, next) => {
  try {
    const { storyId, commentId } = req.params;
    const user = req.user;
    const story = await Story.findById(storyId);
    const comment = await Comment.findById(commentId);
    if (!story) throw new Error("Not found to story");
    if (!comment) throw new Error("That comment already deleted");
    if (comment.user + "" !== user._id + "")
      throw new Error("You cannot delete that comment, because you not owner");
    const index = story.comments.findIndex(function (element) {
      return element + "" === comment._id + "";
    });
    story.comments.splice(index, 1);
    await story.save();
    await comment.remove();
    res.status(200).json("comment deleted");
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
