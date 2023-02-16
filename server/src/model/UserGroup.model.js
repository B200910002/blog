const mongoose = require("mongoose");

const userGroupSchema = mongoose.Schema({
  users: [Object],
});

module.exports.UserGroup = mongoose.model("UserGroup", userGroupSchema);
