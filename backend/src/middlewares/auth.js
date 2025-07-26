const jwt = require('jsonwebtoken');
const User = require('../model/user');

const adminAuth = async (req, res, next) => {
    try {
        // Get token from cookies or authorization header
        const token = req.cookies.token ||
            (req.headers.authorization && req.headers.authorization.split(' ')[1]);

        if (!token) {
            return res.status(401).json({ message: "Access Denied. No Token Provided!" });
        }

        const decodedObj = jwt.verify(token, "Reddy@#123");

        const { _id } = decodedObj;
        const user = await User.findById(_id);

        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }

        req.user = user;
        next();
    } catch (err) {
        // Return a proper JSON error response
        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: "Invalid token", error: err.message });
        }
        return res.status(500).json({ message: "Something Went Wrong", error: err.message });
    }
};

module.exports = { adminAuth };
