const express = require("express");
const router = express.Router();
const bl = require("../models/UsersBL");

router.route("/login/:userName").get(async (req, res) => {
  const userName = req.params.userName;
  let data = await bl.getUserByUserName(userName);
  return res.json(data);
});

module.exports = router;
