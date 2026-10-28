const app = require("./app");
const { port } = require("./config");

app.listen(port, () => {
  console.log(`Billing service listening on port ${port}`);
});
