const express = require("express");
const { invoices } = require("../data/store");

const router = express.Router();

router.get("/:id", (req, res) => {
  const invoice = invoices[req.params.id];
  if (!invoice) return res.sendStatus(404);

  res.json(invoice);
});

module.exports = router;
