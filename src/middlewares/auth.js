const jwt = require('jsonwebtoken');


const adminAuth = (req, res, next) => {

    const cookies = req.cookies;
    const { token } = cookies;

    const isAuthenticated = jwt.verify(token, "Reddy@#123");

    if (!isAuthenticated) {
        res.status(402).send("authentication failed");
    } else {
        next()
    }
}

module.exports = { adminAuth };
