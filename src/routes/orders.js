const express = require("express");
const { coupons } = require("../config");
const { orders } = require("../data/store");

const router = express.Router();

router.post("/:id/coupon", (req, res) => {
  const order = orders[req.params.id];
  if (!order) return res.sendStatus(404);
  if (order.ownerId !== req.user.id) return res.sendStatus(403);

  const discount = coupons[req.body.code];
  if (!discount) {
    return res.status(400).json({ error: "Invalid coupon" });
  }

  order.total *= discount;
  order.couponUsed = true;
  res.json(order);
});

router.post("/:id/fulfill", (req, res) => {
  const order = orders[req.params.id];
  if (!order) return res.sendStatus(404);
  if (order.ownerId !== req.user.id) return res.sendStatus(403);

  order.status = "fulfilled";
  res.json(order);
});

module.exports = router;
