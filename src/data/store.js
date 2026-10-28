const accounts = {
  1: { owner: "alice", balance: 5000 },
  2: { owner: "bob", balance: 9000 },
};

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

module.exports = { accounts, invoices, orders, users };
