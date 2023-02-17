const express = require("express");
const router = express.Router();
const userCtrl = require("../controller/user.controller");
const storyCtrl = require("../controller/story.controller");
const commentCtrl = require("../controller/comment.controller");

//get
router.get("/:userId", storyCtrl.getStories);

router.get("/comments/:storyId", commentCtrl.getComments);

router.get("/replys/:commentId", commentCtrl.getReplys);

//post
router.post("/create-story", userCtrl.protect, storyCtrl.createStory);

router.post("/create-comment/:storyId",userCtrl.protect, commentCtrl.createComment);

router.post("/create-reply/:commentId",userCtrl.protect, commentCtrl.createReply);

module.exports = router;
