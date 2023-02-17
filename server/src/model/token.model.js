const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
  userId: {
    type: Object,
    required: true,
    ref: "user",
    unique: true,
  },
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now(), expires: 3600 },
});

module.exports.Token = mongoose.model("Token", tokenSchema);
