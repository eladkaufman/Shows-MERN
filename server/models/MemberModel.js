const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  name: String,
  email: String,
  city: String,
  subscriptions: [
    { type: mongoose.Schema.Types.ObjectId, ref: "subscriptions" },
  ],
});

module.exports = mongoose.model("members", memberSchema);
