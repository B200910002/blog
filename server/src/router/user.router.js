const express = require("express");
const router = express.Router();
const userCtrl = require("../controller/user.controller");

//get
router.get("/is-authencated", userCtrl.protect, userCtrl.isAuthencated);
router.get("/:id/verify/:token", userCtrl.emailVerify);
router.get("/get-user/:email", userCtrl.protect, userCtrl.getUser);
router.get("/get-followers/:email", userCtrl.protect, userCtrl.getFollowers);
router.get("/get-following/:email", userCtrl.protect, userCtrl.getFollowing);

//post
router.post("/register", userCtrl.register);
router.post("/login", userCtrl.login);
router.post("/upload-picture", userCtrl.uploadPic);

//put
router.put("/edit-user", userCtrl.protect, userCtrl.editUser);
router.put("/follow/:email", userCtrl.protect, userCtrl.follow);
router.put("/unfollow/:email", userCtrl.protect, userCtrl.unFollow);

//patch
router.patch("/change-password", userCtrl.protect, userCtrl.changePassword);

module.exports = router;
