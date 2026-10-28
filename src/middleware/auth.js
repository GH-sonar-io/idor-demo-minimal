const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config");
const { users } = require("../data/store");

function authenticate(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: "Missing token" });

  try {
    const payload = jwt.verify(token, jwtSecret);
    req.user = { id: payload.sub, role: users[payload.sub]?.role };
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
}

module.exports = { authenticate };
