const mongoose = require("mongoose");
const Schema = mongoose.Schema

const userGroupSchema = Schema({
  users: [Schema.Types.ObjectId],
});

module.exports.UserGroup = mongoose.model("UserGroup", userGroupSchema);
