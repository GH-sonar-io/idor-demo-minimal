const express = require("express");
const { users } = require("../data/store");

const router = express.Router();

router.post("/users/:id/promote", (req, res) => {
  const user = users[req.params.id];
  if (!user) return res.sendStatus(404);

  user.role = "admin";
  res.json(user);
});

module.exports = router;
