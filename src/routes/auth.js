const express = require('express');
const authRouter = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationSignUp } = require('../utils/validation');
const User = require('../model/user');

authRouter.post('/signup', async (req, res) => {

    try {
        const { firstName, lastName, email, password } = req.body;

        // validations
        validationSignUp(req);

        // password encryption
        const hashPassword = await bcrypt.hash(password, 10);  // creating a hashpassword (password, saltNumber)
        // console.log(hashPassword);

        const users = new User({ firstName, lastName, email, password: hashPassword });
        await users.save();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: "something went wrong", error: err.message });
    }
}
);

authRouter.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        // const user_id = user._id;

        console.log("User Found:", user);

        if (!user) {
            throw new Error("Invalid Credentials");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log("Password Match:", isPasswordValid);

        if (isPasswordValid) {

            // Generate JWT token
            const token = await jwt.sign({ _id: user._id }, "Reddy@#123", { expiresIn: '1h' });  //hiddencode and secret number
            console.log("token is...", token);

            // Set the token in a cookie
            res.cookie("token", token, { expires: new Date(Date.now() + 900000), httpOnly: true });
            res.send("Login Succesful!!!");
        } else {
            throw new Error("Invalid Credentials")
        }

    } catch (err) {
        res.status(500).json({ message: "Something went wrong", error: err.message });
    }
});

module.exports = { authRouter };