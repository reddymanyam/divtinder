const express = require("express");

const app = express();

app.get("/user", (req, res) => {                      
    res.send({"firstname":"reddy", "secondname":"manyam"})
});

app.post("/user", (req, res) => {                      
    res.send("hello i am from test server...!")
});

app.post("/user", (req, res) =>{
    res.send({"firstName" : "Reddy", "lastName":"Reddy"})
});

app.put("/user", (req,res)=>{
    res.send({"firstName" : "Reddy", "lastName":"Roy"})
});

app.delete("/user", (req,res) =>{
    console.log("succesfully deleted the user data...!");
});

app.use((req, res) => {                            //we want to keep the genral middleware at the end or else it will catch the all the routes
    res.send("hello i am server...!")              //we dont want to use, app.use("/") for routing, because it will catch all the routes like get,put,post 
});                                                //To overcome this we want to use app.get("/user"), app.post("/user")

app.listen(7777, () => {                           //creating the port (port is nothing but a server...!)
    console.log("Hello from the server......!")
})