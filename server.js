const express = require("express");
const bodyParser = require("body-parser");
const server = express();

server.use(bodyParser.json);


const db = require("./db.json");

// process.env.PORT lets the port be set by Heroku
const PORT = process.env.PORT || 7070;

// HTML Routes
server.get("/", function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

server.get("/notes", function(req, res) {
    res.sendFile(__dirname + '/public/notes.html');
});

//API routes
server.get("/api/notes", function (req,res) {
    //send the frontend the whole array in db.json
    // send response in html routes
    res.json(db);

});

server.post("/api/notes", function (req,res) {
    //allow the frontend to send us a new note object and add it to our
    //array in db.json
    console.log(req.params);
    res.send("HELLO WORLD!");
});

server.delete("/api/notes/:id", function (req,res) {
    const id = req.params.id;
    //use the id sent from the frontend via req.params to remove a note from db.json

});


// Write a server for the designated port
server.listen(PORT, function() {
    console.log(`Server is running on port ${PORT}`);
});