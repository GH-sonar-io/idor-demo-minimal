const express = require("express");
const app = express();
app.use(express.json());

// Demo authentication: every request is an authenticated non-admin.
// Real authentication is deliberately outside this example's scope.
app.use((req, res, next) => {
  req.user = { id: "alice", role: "customer" };
  next();
});

const invoices = {
  "inv-100": { ownerId: "alice", amount: 100 },
  "inv-200": { ownerId: "bob", amount: 900, bankAccount: "BOB-PRIVATE" },
};

const orders = {
  "order-100": {
    ownerId: "alice",
    total: 100,
    couponUsed: false,
    paymentStatus: "unpaid",
    status: "draft",
  },
};

const users = {
  alice: { role: "customer" },
  bob: { role: "customer" },
};

// Finding 1: IDOR — authenticated users must only read their own invoices.
app.get("/invoices/:id", (req, res) => {
  const invoice = invoices[req.params.id];
  if (!invoice) return res.sendStatus(404);

  // BUG: no comparison between invoice.ownerId and req.user.id.
  res.json(invoice);
});

// Finding 2: missing authorization — only admins may grant admin privileges.
app.post("/admin/users/:id/promote", (req, res) => {
  const user = users[req.params.id];
  if (!user) return res.sendStatus(404);

  // BUG: authentication alone is not an admin permission check.
  user.role = "admin";
  res.json(user);
});

// Finding 3: repeatable benefit — WELCOME20 may be used once per order.
app.post("/orders/:id/coupon", (req, res) => {
  const order = orders[req.params.id];
  if (!order) return res.sendStatus(404);
  if (order.ownerId !== req.user.id) return res.sendStatus(403);
  if (req.body.code !== "WELCOME20") {
    return res.status(400).json({ error: "Invalid coupon" });
  }

  // BUG: couponUsed is recorded but never checked before applying again.
  order.total *= 0.8;
  order.couponUsed = true;
  res.json(order);
});

// Finding 4: workflow bypass — payment must complete before fulfillment.
app.post("/orders/:id/fulfill", (req, res) => {
  const order = orders[req.params.id];
  if (!order) return res.sendStatus(404);
  if (order.ownerId !== req.user.id) return res.sendStatus(403);

  // BUG: no check that paymentStatus === "paid".
  order.status = "fulfilled";
  res.json(order);
});

app.listen(3000, "127.0.0.1", () => {
  console.log("Vulnerable demo: http://127.0.0.1:3000");
});
