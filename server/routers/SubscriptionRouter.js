const express = require("express");
const router = express.Router();
const bl = require("../models/SubscriptionBl");

router.route("/").get(async (req, res) => {
  let data = await bl.getAllSubscriptions();
  return res.json(data);
});

router.route("/:id").get(async (req, res) => {
  let memId = req.params.id;
  let data = await bl.getMemberSubscriptions(memId);
  return res.json(data);
});

router.route("/").post(async (req, res) => {
  let data = await bl.addSubscription(req.body);
  return res.json(data);
});

router.route("/:id").delete(async (req, res) => {
  let data = await bl.deleteSubscription(req.params.id);
  return res.json(data);
});

module.exports = router;
