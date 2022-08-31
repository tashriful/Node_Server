// Requiring in-built https for creating
// https server
const https = require("https");

// Express for handling GET and POST request
const express = require("express");
const app = express();

// Requiring file system to use local files
const fs = require("fs");

// Parsing the form of body to take
// input from forms
const bodyParser = require("body-parser");

// Configuring express to use body-parser
// as middle-ware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Get request for root of the app
app.get("/", function (req, res) {
  // Sending index.html to the browser
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write("<html><body><p>Server is running.</p></body></html>");
  res.end();
});

app.get("/signin", function (req, res) {
  // Sending index.html to the browser
  var code = req.query.code;

  res.writeHead(200, { "Content-Type": "text/html" });
  console.log(code);
  res.write(`<html><body><p>Server is running.</p>
  <form action="https://bis/BisIdService/connect/token" method="post">
  <label for="client_id">client_id:</label>
  <input type="text" id="client_id" name="client_id" value="ACSVisitorManagement" ><br><br>
  
  <label for="code">code:</label>
  <input type="text" id="code" name="code" value="${code}"><br><br>
  
  <label for="redirect_uri">redirect_uri:</label>
  <input type="text" id="redirect_uri" name="redirect_uri" value="https://BIS:5706/signin"><br><br>
  
  <label for="code_verifier">code_verifier:</label>
  <input type="text" id="code_verifier" name="code_verifier" value=""><br><br>
  
  <label for="grant_type">grant_type:</label>
  <input type="text" id="grant_type" name="grant_type" value="authorization_code"><br><br>
  
  
  <input type="submit" value="Submit">
</form>
  </body></html>"`);
  
  res.end();
});

// Post request for geetting input from
// the form
app.post("/mssg", function (req, res) {
  // Logging the form body
  console.log(req.body);

  // Redirecting to the root
  res.redirect("/");
});

// Creating object of key and certificate
// for SSL
const options = {
  key: fs.readFileSync("server.key"),
  cert: fs.readFileSync("server.cert"),
};

// Creating https server by passing
// options and app object
https.createServer(options, app).listen(5706, function (req, res) {
  console.log("Server started at port 5706");
});
