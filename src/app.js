const express = require("express");

const app = express();

app.use("/hello", (req, res) => {                      // these are the routes.....!
    res.send("hello hello hello my dear friends....!")
});

app.use("/test", (req, res) => {                       // these are the routes.........!
    res.send("hello i am from test server...!")
});

app.use((req, res) => {                            //we want to keep the genral middleware at the end or else it will catch the all the routes
    res.send("hello i am server...!")
});

app.listen(7777, () => {                           //creating the port (port is nothing but a server...!)
    console.log("Hello from the server......!")
})