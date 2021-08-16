const express = require("express");
const router = express.Router();
const bl = require("../models/MemberBL");

// get all members
router.route("/").get(async (req, res) => {
  let data = await bl.getMembers();
  return res.json(data);
});

// get member by id
router.route("/:id").get(async (req, res) => {
  let data = await bl.getMember(req.params.id);
  return res.json(data);
});

// edit member
router.route("/:id").put(async (req, res) => {
  let id = req.params.id;
  let body = req.body;
  let data = await bl.editMember(id, body);
  return res.json(data);
});

// add member
router.route("/").post(async (req, res) => {
  let memberObj = req.body;
  let data = await bl.addMember(memberObj);
  return res.json(data);
});

// delete member
router.route("/:id").delete(async (req, res) => {
  let id = req.params.id;
  let data = await bl.deletMember(id);
  return res.json(data);
});

module.exports = router;
