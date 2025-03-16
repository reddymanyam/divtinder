const express = require("express");
const connectDB = require('./config/database');
const app = express();
const User = require('./model/user');

app.use(express.json());

// app.post('/signup', async (req, res) => {


//     const user = new User(req.body);
//     console.log(req.body);

//     try {
//         await user.save();
//         res.send("data saved succesfully")
//     }
//     catch (err) {
//         console.log("Data is not sent successfully");
//     }
// })

app.post('/signup', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save(); // Use await to ensure it completes
        console.log("Data saved successfully:", user);
        res.status(201).send("Data saved successfully");
    } catch (err) {
        console.error("Data is not sent successfully:", err);
        res.status(500).send("Internal Server Error");
    }
});

// Getting the data of the one person based on the email id

app.get('/user', async (req, res) => {
    
    const emailId = req.body.email;
    try {
        const users = await User.findOneAndDelete({email : emailId});
        res.status(200).send(users); 
    }
    catch (err) {
        res.status(401).send("something went wrong")
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