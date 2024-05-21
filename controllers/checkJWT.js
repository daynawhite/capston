const JWT = require ("jsonwebtoken")
const supersecret = process.env.JWT_SECRET

const checkJWT = (req, res, next) => {
    let token;
    if (!req.headers.authorization) {
        token = null;
        res.status(401).json("you are not authorized")
    } else {
        let bearer = req.headers.authorization.split(" ")
        token = bearer[1]
        JWT.verify(token, supersecret, (err, decoded) => {
            if (err) {
                res.status(401).json("you are not authorized")
            } else {
                console.log(decoded)
                req.user_id=decoded.user_id
                next()
            }
        })
    }
}

module.exports = checkJWT