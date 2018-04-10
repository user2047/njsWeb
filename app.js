const express = require("express");
const hbs = require("hbs");

var year = new Date().getFullYear();

var app = express();

hbs.registerPartials(__dirname+"/views/partials")
app.set("view engine","hbs");
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

app.get("/bad",(req,res)=>{
  res.send({
    errorMessage:"bad gateway"
  });
});



app.listen(3000,()=>{
  console.log("serving on port 3000");
});
