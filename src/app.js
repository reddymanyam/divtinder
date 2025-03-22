const express = require("express");
const connectDB = require('./config/database');
const app = express();
const User = require('./model/user');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const { validationSignUp } = require('./utils/validation');

require('dotenv').config();

const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());

app.get('/users', async (req, res) => {
    try {
        const users = await User.find({});  // Get the all the data from the database
        res.status(200).json({ "message": "Data is Successfully send", users })
    } catch (err) {
        res.status(500).json({ message: "something went wrong", error: err.message });  // This is very Important for knowing what type of error , it is throwing
    }
});

app.post('/users', async (req, res) => {

    try {
        const { firstName, lastName, email, password } = req.body;

        // validations
        validationSignUp(req);

        // password encryption
        const hashPassword = await bcrypt.hash(password, 10);
        // console.log(hashPassword);

        const users = new User({ firstName, lastName, email, password: hashPassword });
        await users.save();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: "something went wrong", error: err.message });
    }
}
);

app.post('/signup', async (req, res) => {

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

app.post('/login', async (req, res) => {
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
            const token = await jwt.sign({ _id: user._id }, "Reddy@#123");  //hiddencode and secret number
            console.log("token is...", token);

            // Set the token in a cookie
            res.cookie("token", token);       
            res.send("Login Succesful!!!");
        } else {
            throw new Error("Invalid Credentials")
        }

    } catch (err) {
        res.status(500).json({ message: "Something went wrong", error: err.message });
    }
});


app.get('/profile', async (req, res) => {

    try {
        const cookies = req.cookies;   // Getting Cookies Value
        console.log("cookie is-----", cookies);

        const { token } = cookies;     // Getting token value from cookies
        if (!token) {
            res.status(401).json({ message: "Unauthorized: No token provided" })
        }
        console.log("token is--------", token);


        //token validation
        const decoded = jwt.verify(token, "Reddy@#123");
        console.log("decoded is ----------", decoded);

        const { _id } = decoded;

        res.send("Reading cookie")
    } catch (err) {
        res.status(500).send({ message: "Something went Wrong", err })
    }
})

app.patch('/users/:id', async (req, res) => {

    const reqId = req.params.id;
    const updatedData = req.body;

    try {

        const ALLOWED_UPDATES = ["userId", "firstName", "lastName", "skills", "about"];
        const isAllowedUpdates = Object.keys(updatedData).every((k) => ALLOWED_UPDATES.includes(k));

        if (!isAllowedUpdates) {
            throw new Error("update not allowed");
        }

        if (updatedData.skills.length > 10) {
            throw new Error("you cannot add more than 10 skills");
        }
        const users = await User.findOneAndUpdate({ _id: reqId }, updatedData, {
            returnDocument: "after",
            returnValidators: true,
        });
        if (!users) {
            res.status(404).json({ message: "users is not found" });
        }
        res.status(200).json({ message: "users Data Updated Succesfully", users });
    } catch (err) {
        res.status(500).json({ message: "something went wrong", error: err.message });
    }
});

app.delete('/users/:id', async (req, res) => {

    const reqId = req.params.id;
    try {
        const users = await User.findByIdAndDelete({ _id: reqId });
        if (!users) {
            res.status(404).json({ message: "users is not found" });
        }
        res.status(200).json({ message: "data deleted succesfully", users });
    } catch (err) {
        res.status(500).json({ message: "something went wrong", error: err.message });
    }
})

connectDB()
    .then(() => {
        console.log("database connection established..!");
        app.listen(PORT, () => {                           //creating the port (port is nothing but a server...!)
            console.log(`Server is running at PORT:${PORT}`)
        })
    })
    .catch((err) => {
        console.log("database connection is not established")
    })