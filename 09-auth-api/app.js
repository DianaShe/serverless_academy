const express = require("express");

const cors = require("cors");

const router = require("./routes/api/users");

const authenticate = require("./middlewares/authenticate");
const { getCurrent } = require("./controllers/users");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", router);

app.get("/me", authenticate, getCurrent);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Internal server error", success } = err;

  message.includes("duplicate key")
    ? res.status(409).json({ success: false, error: message })
    : res.status(status).json({ success, error: message });
});

app.listen(3000, () => {
  console.log("Server running");
});
module.exports = app;
