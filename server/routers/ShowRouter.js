const express = require("express");
const router = express.Router();
const bl = require("../models/ShowBL");

// get all shows
router.route("/").get(async (req, res) => {
  let data = await bl.getShows();
  return res.json(data);
});

// get show by id
router.route("/:id").get(async (req, res) => {
  let data = await bl.getShow(req.params.id);
  return res.json(data);
});

// edit show
router.route("/:id").put(async (req, res) => {
  let id = req.params.id;
  let body = req.body;
  let data = await bl.editShow(id, body);
  return res.json(data);
});

// add show
router.route("/").post(async (req, res) => {
  let showObj = req.body;
  let data = await bl.addShow(showObj);
  return res.json(data);
});

// delete show
router.route("/:id").delete(async (req, res) => {
  let id = req.params.id;
  let data = await bl.deletShow(id);
  return res.json(data);
});

module.exports = router;
