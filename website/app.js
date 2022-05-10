const express = require("express");
const hbs=require("hbs");
const app = express();
const fs = require("fs");
const expressHbs=require("express-handlebars");
const path = require('path');
const bodyParser=require("body-parser");
const urlencodedParser=bodyParser.urlencoded({extended:false});
var arr=JSON.parse(fs.readFileSync("userTable.json", "utf8"));

app.set("view options", { layout: "layouts/layout" }); 
app.set("view engine","hbs");
hbs.registerPartials(path.join(__dirname+"/views/partials"));

var Data = new Date();
app.use(function(request,response,next){
    console.log('Запрошенный адрес:'+ request.url+'\t'+Data);
    next();
});//Логи

app.use(express.static(path.join(__dirname, 'style')));
app.use(express.static(path.join(__dirname, 'scripts')));
app.use(express.static(path.join(__dirname, 'img')));

app.get("/action",urlencodedParser,function(request,response){
    response.render("action");
});
app.get("/adventure",urlencodedParser,function(request,response){
    response.render("adventure");
});
app.get("/beat",urlencodedParser,function(request,response){
    response.render("beat");
});

app.get("/fightings",urlencodedParser,function(request,response){
  response.render("fightings");
});
app.get("/firstvideogames",urlencodedParser,function(request,response){
  response.render("firstvideogames");
});

app.get("/",urlencodedParser,function(request,response){
  response.redirect("/firstvideogames");
});

app.get("/genre",urlencodedParser,function(request,response){
  response.render("genre");
});

app.get("/makeyourgenre",urlencodedParser,function(request,response){
  response.render("makeyourgenre");
});
app.get("/platformers",urlencodedParser,function(request,response){
  response.render("platformers");
});
app.get("/rithm",urlencodedParser,function(request,response){
  response.render("rithm");
});

app.get("/shooters",urlencodedParser,function(request,response){
  response.render("shooters");
});
app.get("/steath",urlencodedParser,function(request,response){
  response.render("steath");
});
app.get("/survival",urlencodedParser,function(request,response){
  response.render("survival");
});

app.post("/MainUserTable",urlencodedParser,function(request,response){
    if(!request.body) return response.sendStatus(400);
    else{
        arr=JSON.parse(fs.readFileSync("userTable.json", "utf8"));
        arr.push({name:request.body.name, description:request.body.description});
        fs.writeFile("userTable.json", JSON.stringify(arr), (error) =>{
            if(error) throw error;
            console.log("Запись файла завершена.");
        });
    }
 });

app.listen(3000,function(){
    console.log("Сервер запущен. Порт 3000")
});
