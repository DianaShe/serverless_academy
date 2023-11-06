const pool = require("../../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const HttpError = require("../../utilities/HttpError");

const SECRET = process.env.SECRET || "wertyujcvbnmfyuiokjhcvbnhjk";

const signIn = async (req, res) => {
  const { email, password } = req.body;

  const newUser = await pool.query(
    "SELECT * FROM profile WHERE profile.email = $1",
    [email]
  );

  const user = newUser.rows[0];
  const passwordIsValid = await bcrypt.compare(password, user.password)
  if (!user || !passwordIsValid) {
    throw HttpError(404, 'User not found', true)
  }

  const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: "1h" });
  const refreshToken = jwt.sign({ id: user.id, email }, SECRET);
  
  res
    .status(201)
    .json({
      sucsess: true,
      data: { id: user.id, accessToken: token, refreshToken },
    });
};

module.exports = signIn;