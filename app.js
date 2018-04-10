const express = require("express");

var app = express();

app.use(express.static(__dirname + "/public"));

app.get("/",(req,res)=>{
  // res.send("<h1>Hello World</h1>");
  res.send({
    name: "Cameron",
    likes: ["running","programming"]
  });
});

app.get("/about",(req,res)=>{
  res.send("im gay");
});

app.get("/bad",(req,res)=>{
  res.send({
    errorMessage:"bad gateway"
  });
});



app.listen(3000,()=>{
  console.log("serving on port 3000");
});
