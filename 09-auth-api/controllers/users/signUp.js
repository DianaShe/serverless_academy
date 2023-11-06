const pool = require("../../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// const HttpError = require("../../utilities/HttpError");

const SECRET = process.env.SECRET || "wertyujcvbnmfyuiokjhcvbnhjk";
const EXPIRESIN = process.env.EXPIRESIN || "1h"

const signUp = async (req, res) => {
  const { email, password } = req.body;
  const hashPassword = await bcrypt.hash(password, 10)

  const newUser = await pool.query(
    "INSERT INTO profile (email, password) VALUES($1, $2) RETURNING *",
    [email, hashPassword]
  );

  const user = newUser.rows[0];

  const accessToken = jwt.sign({ id: user.id }, SECRET, { expiresIn: EXPIRESIN });
  const refreshToken = jwt.sign({ id: user.id, email }, SECRET);

  await pool.query(
    "UPDATE profile SET access_token = $1, refresh_token = $2 WHERE id = $3",
    [accessToken, refreshToken, user.id]
  )
  
  res
    .status(201)
    .json({
      sucsess: true,
      data: { id: user.id, accessToken, refreshToken },
    });
};

module.exports = signUp;
