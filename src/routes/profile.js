const express = require('express');
const profileRouter = express.Router();
const { adminAuth } = require('../middlewares/auth');

profileRouter.get('/profile/view', adminAuth, async (req, res) => {

    try {
        const user = req.user;
        res.send(user);
    } catch (err) {
        res.status(500).send({ message: "Something went Wrong", err })
    }
});

profileRouter.patch('/profile/edit', adminAuth, async (req, res) => {
    try {

    } catch (err) {
        res.status(500).send({ message: "Something Went Wrong", err })
    }
})
module.exports = { profileRouter };