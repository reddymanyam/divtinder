const express = require('express');
const requestRouter = express.Router();
const { adminAuth } = require('../middlewares/auth');

requestRouter.post('/sendConnectionRequest', adminAuth, async (req, res) => {
    try {
        user = req.user;
        const { firstName } = user;

        res.status(201).send(firstName + "sent the connection request")
    } catch (err) {
        res.status(500).json({ message: "something went wrong", err: err.message });
    }
})


module.exports = { requestRouter };