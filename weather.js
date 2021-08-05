
const express = require("express");
const bodyParser = require("body-parser")
const https = require("https")

const app = express();
app.use(bodyParser.urlencoded({extended : true}));

app.get("/",function(req,res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/",function(req,res){

  const cityName = req.body.City;

  const url="https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid=1312fd81781bdc471b07f84e86887d35&units=metric"

  https.get(url,function(responce){
    responce.on('data',function(data){
      console.log(responce.statusCode);
      weatherInfo = JSON.parse(data);
      res.write("<h1>The temperature of "+cityName+" is "+ weatherInfo.main.temp+"</h2>")
      res.send()
    })

  })

});

app.listen(2505,function(req,res){
  console.log("working on local host 2505");
});
