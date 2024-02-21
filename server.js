// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();
//Dependencies
const bodyParser = require("body-parser");

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());
// Initialize the main project folder
app.use(express.static("Weather-Journal-App"));

// Setup Server
const port = 8080;
const server = app.listen(port, () => {
  console.log("server running");
  console.log(`running on localhost: ${port}`);
});
//GET route that returns the projectData object
app.get("/all", function (req, res) {
  res.send(projectData);
});

// POST route that adds incoming data to projectData
app.post("/addWeatherData", function (req, res) {
  console.log(req.body);
  projectData["date"] = req.body.date;
  projectData["temperature"] = req.body.temperature;
  projectData["main"] = req.body.main;
  projectData["icon"] = req.body.icon;
  projectData["description"] = req.body.description;
  projectData["userResponse"] = req.body.userResponse;
  // console.log(req.body);
  console.log(projectData);
  res.send(projectData);
});
