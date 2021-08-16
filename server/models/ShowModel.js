const mongoose = require("mongoose");

const showSchema = new mongoose.Schema({
  name: String,
  premiered: String,
  genres: [String],
  imageUrl: String,
  subscriptions: [
    { type: mongoose.Schema.Types.ObjectId, ref: "subscriptions" },
  ],
});

module.exports = mongoose.model("shows", showSchema);
