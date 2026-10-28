module.exports = {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || "dev-secret",
  coupons: { WELCOME20: 0.8 },
};
