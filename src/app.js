const express = require("express");
const connectDB = require('./config/database');
const app = express();
const User = require('./model/user');

app.use(express.json());

app.post('/signup', async(req,res)=>{
  
    const user = new User({
        "firstName" : "Reddy",
        "lastName" : "Manyam",
        "email":"Reddy123@gmail.com",
        "password":"Reddy@1854425"
    })

    try{
        user.save();
        res.send("data saved succesfully")
    }
    catch(err){
        console.log("Data is not sent successfully");
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