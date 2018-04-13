const express = require("express");
const hbs = require("hbs");
const fs = require("fs");
const port = process.env.PORT || 3000;

var year = new Date().getFullYear();

var app = express();

hbs.registerPartials(__dirname+"/views/partials")
app.set("view engine","hbs");


var maintenence = {
  title: "Under Maintenence"
}
// app.use((req,res,next)=>{
//   res.render("maintenence.hbs",maintenence);
// });

app.use((req,res,next)=>{
  var now = new Date().toString();
  var log = `${now}:${req.method}, ${req.url}`
  console.log(log);
  fs.appendFile("server.log", log+"\n",(err)=>{
    if (err){
      console.log("Unable to append to server.log");
    }
  })
  next();
});

app.use(express.static(__dirname + "/public"));


hbs.registerHelper("getCurrentYear",()=>{
  return new Date().getFullYear();
});

hbs.registerHelper("screamIt",(text)=>{
  return text.toUpperCase()
})

var root = {
  title: "Home",
  welcomeMessage: "Hello World"
}

app.get("/",(req,res)=>{
  res.render("index.hbs",root)
})

var about = {
  title:"About",
  welcomeMessage: "Welcome to the about page"
}

app.get("/about",(req,res)=>{
  res.render("about.hbs",about);
});

var projects = {
  title:"Projects",
  welcomeMessage: "Welcome to the project page"
}

app.get("/projects",(req,res)=>{
  res.render("projects.hbs",projects)
})

app.get("/bad",(req,res)=>{
  res.send({
    errorMessage:"bad gateway"
  });
});



app.listen(port,()=>{
  console.log(`serving on port ${port}`);
});
