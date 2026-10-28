const express = require("express");
const { accounts } = require("../data/store");

const router = express.Router();

router.get("/:id", (req, res) => {
  const account = accounts[req.params.id];
  if (!account) return res.sendStatus(404);

  res.json(account);
});

module.exports = router;
