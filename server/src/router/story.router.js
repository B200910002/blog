const express = require("express");
const router = express.Router();
const userCtrl = require("../controller/user.controller");
const storyCtrl = require("../controller/story.controller");
const commentCtrl = require("../controller/comment.controller");

//get
router.get("/get-all/:email", storyCtrl.getStories);
router.get("/get-by-id/:storyId", storyCtrl.getByIdStory);
router.get("/get-comments/:storyId/comments", commentCtrl.getComments);
router.get("/get-comment-reply/:commentId/replys", commentCtrl.getReplys);
router.get("/get-from-following", userCtrl.protect, storyCtrl.getStoriesFromFollowing)

//post
router.post("/create-story", userCtrl.protect, storyCtrl.createStory);
// router.post("/create-story", storyCtrl.createStory);
router.post("/:storyId/create-comment", userCtrl.protect, commentCtrl.createComment);
router.post("/:commentId/create-reply", userCtrl.protect, commentCtrl.createReply);

//put
router.put("/edit-story/:storyId", userCtrl.protect, storyCtrl.editStory);
router.put("/edit-comment/:commentId", userCtrl.protect, commentCtrl.editComment);

//delete
router.delete("/delete-story/:storyId", userCtrl.protect, storyCtrl.deleteStory);
router.delete("/:storyId/delete-comment/:commentId", userCtrl.protect, commentCtrl.deleteComment);
router.delete("/:commentId/delete-comment/:replyId", userCtrl.protect,)

module.exports = router;
