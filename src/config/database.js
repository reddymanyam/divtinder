const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://reddappareddy18:fX7qq3Rh8j7hPF4U@devtinder.pmdxg.mongodb.net/devTinder");
};

connectDB()
    .then(() => {
        console.log("connection is established...!");
    }).catch((err) => {
        console.log("connection is not established!!!");
    });
