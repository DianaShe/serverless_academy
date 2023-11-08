const express = require("express");

const cors = require("cors");
const Address6 = require("ip-address").Address6;
const pool = require("./bd");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  let ip = req.ip;
  if (req.ip.includes(":")) {
    const address = new Address6(req.ip);

    const teredo = address.inspectTeredo();

    const ip4 = teredo.client4;

    const resp = await pool.query("SELECT ip2int($1)", [ip4]);

    ip = resp.rows[0].ip2int;
  }

  const result = await pool.query(
    "SELECT * FROM ips WHERE ($1) BETWEEN ip_from and ip_to",
    [ip]
  );
  const obj = result.rows[0];
  console.log(`${obj.country} - ${req.ip}`);
  res.json({
    country: obj.country,
    ip: req.ip,
  });
});

app.listen(3000, () => {
  console.log("Server running");
});
module.exports = app;
