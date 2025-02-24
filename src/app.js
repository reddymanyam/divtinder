const express = require("express");

const app = express();

app.use((req,res) =>{
    res.send("hello i am server...!")
});

app.use("/hello",(req,res) =>{
    res.send("hello hello hello my dear friends....!")
});


app.use("/test",(req,res) =>{
    res.send("hello i am from test server...!")
});

app.listen(7777, ()=>{
    console.log("Hello from the server......!")
})