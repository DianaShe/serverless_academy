const jwt = require('jsonwebtoken')
const HttpError = require('../utilities/HttpError');
const pool = require('../db');

const SECRET = process.env.SECRET || "wertyujcvbnmfyuiokjhcvbnhjk";

const authenticate = async (req, res, next) => {
    const {authorization = ""} = req.headers
    const token = authorization?.startsWith('Bearer') && authorization.split(' ')[1]
    
    try {
        const {id} = jwt.verify(token, SECRET)
        
        const userInfo = await pool.query(
            "SELECT * FROM profile WHERE id = $1",
            [id]
          );
        
        const user = userInfo.rows[0]
        
        if (!user || !user.access_token || user.access_token !== token) {
            next(HttpError(401, "Not authorized"))
        }
        req.user = user
        next()

    } catch (error) {
        console.log(error)
        next(HttpError(401, "Not authorized"))
    }
}

module.exports = authenticate