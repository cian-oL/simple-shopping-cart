const jwt = require("jsonwebtoken");

const jwtSecret = "jwt secret password";

const middleware = (req, res, next) => {
    // check header, url, or post parameters for token
    const token = req.body["x-access-token"] || req.query("x-access-token") || req.headers["x-access-token"];

    // decode token
    if (token) {
        jwt.verify(token, jwtSecret, (err, decoded) => {
            if (err) {
                return res.status(403).send({
                    success: false,
                    message: "Failed to authenticate token."
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.status(401).semd({
            success: false,
            message: "No token provided."
        });
    }
};

module.exports = middleware;