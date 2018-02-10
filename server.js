
// Dependencies
var cheerio = require("cheerio");
var request = require("request");
var mongojs = require("mongojs");
var bodyParser = require("body-parser");
var express = require("express");
var handlebars = require("express-handlebars");

// Initialize Express
var app = express();

// Set up a static folder (public) for our web app
app.use(express.static("public"));

// Database configuration
var databaseUrl = "dallasCowboys";
var collections = ["articles"];

// Use mongoj to hook the database to the db variable
var db = mongojs(databaseUrl, collections);

// log an error if any errors occur when mongodb is connected
db.on("error", function(error){
  console.log("Database Error:", error);
})

// Make a request call to grab the HTML body from the site of your choice
request("http://www.dallascowboys.com/", function(error, response, html) {

  // Load the HTML into cheerio and save it to a variablecd ..
  // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
  var $ = cheerio.load(html);

  // An empty array to save the data that we'll scrape
  var results = [];

  // Select each element in the HTML body from which you want information.
  // NOTE: Cheerio selectors function similarly to jQuery's selectors,
  // but be sure to visit the package's npm page to see how it works
  $(".content .field").each(function(i, element) {

    var link = $(element).children().attr("href");
    var title = $(element).children().text();

    // Save these results in an object that we'll push into the results array we defined earlier
    results.push({
      title: title,
      link: link
    });
  });

  // Log the results once you've looped through each of the elements found with cheerio
  console.log(results);
});
