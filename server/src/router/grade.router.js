const express = require("express");
const router = express.Router();
const userCtrl = require("../controller/user.controller");
const gradeCtrl = require("../controller/grade.controller");

//get
router.get("/", userCtrl.protect, gradeCtrl.getAll);

//post
router.post("/user", gradeCtrl.create);
router.post("/import", gradeCtrl.import);

module.exports = router;
