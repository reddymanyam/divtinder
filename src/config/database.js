const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://reddappareddy18:fX7qq3Rh8j7hPF4U@devtinder.pmdxg.mongodb.net/?retryWrites=true&w=majority&appName=Devtinder");
};


module.exports = connectDB;