var express = require("express");
var bodyParser = require("body-parser");

var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/views"));
app.use(express.static(__dirname + "/scripts"));
app.use(express.static(__dirname + "/public"));

var Todos = require("./models/Todos");
var api_routes = require("./routes/api")
app.use("/api/todos", api_routes);

app.get("/", function(req, res){
    res.sendFile("index.html");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server initiated");
});                                                                 