
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req, res) {

res.sendFile(__dirname + "/index.html");

});

app.post("/", function(req, res) {

  const query = req.body.cityName;
  const apiKey = "eff063dac31457461d576178ee74b80d";
  const unit = "Metric";

  const url = "https://api.openweathermap.org/data/2.5/weather?appid=" + apiKey +"&q=" + query +"&units=" + unit;
    https.get(url, function(response) {
      console.log(response.statusCode);

      response.on("data", function(data) {
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const description = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

        console.log(temp);
        console.log(description);
        var sendTemp = "The weather in " + query +" is " + temp + " degrees Celcius.";
        var sendDes = "The weather description is: " + description;

        res.send("<h1>" + sendTemp + "</h1><br>" + sendDes + "<img src=" + imageURL + "></img>");
      });


    });



});








app.listen(port, function() {
  console.log("Server is running on port 3000");
});
