const express = require("express");
const connectDB = require('./config/database');
const app = express();
const User = require('./model/user');

app.use(express.json());

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

        const users = new User(req.body);
        await users.save();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: "something went wrong", error: err.message });
    }
}
);


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
        app.listen(7777, () => {                           //creating the port (port is nothing but a server...!)
            console.log("Hello from the server......!")
        })
    })
    .catch((err) => {
        console.log("database connection is not established")
    })