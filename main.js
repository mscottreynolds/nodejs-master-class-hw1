/**
 * Homework Assignment #1 for Node.js Master Class.
 * Creates an RESTful JSON API that listens on port 31415.  Requests to "/hello" respond with a JSON welcome message.
 * By: M. Scott Reynolds
 * Date: 3 September 2018
 */
"use strict";
 
 // Dependencies
 var http = require('http');
 var url = require('url');
 
 // Create the http server.
 var httpServer = http.createServer(function(req, res) {
     processRequest(req, res);
});

httpServer.listen(31415, function() {
    console.log("The HTTP server is lestening on port 31415.");
});

// Process http requests.
var processRequest = function(req, res) {
    // Get the URL and parse it.
    var parsedUrl = url.parse(req.url, true);
    var path = parsedUrl.pathname;
    var trimmedPath = path.replace(/^\/+|\/+$/g, '');
    var queryString = parsedUrl.query;
    var method = req.method.toUpperCase();
    
    // Default response.
    var payload = {};
    var statusCode = 404;
    
    // Process API request.
    if (trimmedPath == "hello") {
        payload = {
            welcome: "Hello.  The value of Pi to 26 digits is 3.14159265358979323846264338"
        };
        statusCode = 200;
    }
    
    res.setHeader('Content-Type', 'application/json');
    res.writeHead(statusCode);
    res.end(JSON.stringify(payload));
    
    // Log request.
    console.log(method + " /" + trimmedPath, queryString, statusCode);
};
