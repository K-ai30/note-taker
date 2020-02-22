const express = require("express");
const server = express();
const PORT = 3000;

// write a route for the port
server.get("*", function(req, res) {
    res.sendFile(__dirname + '/main/index.html');
})

server.get("/notes", function(req, res) {
    res.sendFile(__dirname + '/notes/notes.html');
})

// Write a server for the designated port
server.listen(PORT, function() {
    console.log(`Server is running on port ${PORT}`);
})