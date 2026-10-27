const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";
const COUPONS = { WELCOME20: 0.8 };

const invoices = {
  "inv-100": { ownerId: "alice", amount: 100, status: "paid" },
  "inv-200": { ownerId: "bob", amount: 900, status: "paid", bankAccount: "DE89370400440532013000" },
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
  alice: { role: "customer", email: "alice@example.com" },
  bob: { role: "customer", email: "bob@example.com" },
};

function authenticate(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: "Missing token" });

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = { id: payload.sub, role: users[payload.sub]?.role };
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
}

app.use(authenticate);

app.get("/invoices/:id", (req, res) => {
  const invoice = invoices[req.params.id];
  if (!invoice) return res.sendStatus(404);

  res.json(invoice);
});

app.post("/admin/users/:id/promote", (req, res) => {
  const user = users[req.params.id];
  if (!user) return res.sendStatus(404);

  user.role = "admin";
  res.json(user);
});

app.post("/orders/:id/coupon", (req, res) => {
  const order = orders[req.params.id];
  if (!order) return res.sendStatus(404);
  if (order.ownerId !== req.user.id) return res.sendStatus(403);

  const discount = COUPONS[req.body.code];
  if (!discount) {
    return res.status(400).json({ error: "Invalid coupon" });
  }

  order.total *= discount;
  order.couponUsed = true;
  res.json(order);
});

app.post("/orders/:id/fulfill", (req, res) => {
  const order = orders[req.params.id];
  if (!order) return res.sendStatus(404);
  if (order.ownerId !== req.user.id) return res.sendStatus(403);

  order.status = "fulfilled";
  res.json(order);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Billing API listening on port ${port}`);
});
