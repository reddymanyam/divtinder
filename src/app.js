const express = require("express");

require('./config/database')
const app = express();


app.listen(7777, () => {                           //creating the port (port is nothing but a server...!)
    console.log("Hello from the server......!")
})