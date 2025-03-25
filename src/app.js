const express = require("express");
const connectDB = require('./config/database');
const app = express();
const cookieParser = require('cookie-parser');


require('dotenv').config();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());

const { authRouter } = require('./routes/auth');
const { profileRouter } = require('./routes/profile');
const { requestRouter } = require('./routes/request');

app.use('/', authRouter);
app.use('/', profileRouter);
app.use('/', requestRouter);

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