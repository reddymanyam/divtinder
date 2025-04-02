const express = require('express');
const profileRouter = express.Router();
const { adminAuth } = require('../middlewares/auth');

// View Profile Route
profileRouter.get('/profile/view', adminAuth, async (req, res) => {
    try {
        if (!req.user) {
            return res.status(404).send({ message: "User not found" });
        }
        res.status(200).send(req.user);
    } catch (err) {
        res.status(500).send({ message: "Something went wrong", error: err.message });
    }
});

// Edit Profile Route
profileRouter.patch('/profile/edit', adminAuth, async (req, res) => {
    try {
        const user = req.user;
        const updates = req.body;
        
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        
        Object.keys(updates).forEach(key => {
            user[key] = updates[key];
        });

        await user.save(); // Assuming user is a Mongoose model

        res.status(200).send({ message: "Profile updated successfully", user });
    } catch (err) {
        res.status(500).send({ message: "Something went wrong", error: err.message });
    }
});

module.exports = { profileRouter };
