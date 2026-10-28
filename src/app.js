const express = require("express");
const { authenticate } = require("./middleware/auth");

const app = express();
app.use(express.json());
app.use(authenticate);

app.use("/api/accounts", require("./routes/accounts"));
app.use("/api/invoices", require("./routes/invoices"));
app.use("/api/orders", require("./routes/orders"));
app.use("/api/admin", require("./routes/admin"));

module.exports = app;
