const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({

  show_id: { type: mongoose.Schema.Types.ObjectId, ref: "shows" },
  member_id: { type: mongoose.Schema.Types.ObjectId, ref: "members" },
  date: String,
});

module.exports = mongoose.model("subscriptions", subscriptionSchema);
