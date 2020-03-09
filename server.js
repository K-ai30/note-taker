const fs = require('fs');
const express = require("express");
const bodyParser = require("body-parser");
const server = express();

server.use(bodyParser.urlencoded({ extended: true }));
server.use(express.static("public"));

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
    // allow the frontend to send us a new note object and add it to our
    let title = req.body.data.title;
    let message = req.body.data.message;
    let note = {id: db.length + 1, title: title, message: message};
    // array in db.json
    saveNote(note);
    res.json(db);
});

server.post("/api/notes/:id", function (req,res) {
    const id = req.params.id;
    //use the id sent from the frontend via req.params to remove a note from db.json
    db.splice(id, 1);
    saveDB();
    res.json({id: id})
});

// catches the things at the things above it
server.get("*", function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

function saveDB() {
// write new state of db to the .json file
    fs.writeFile('./db.json', JSON.stringify(db), function writeJSON(err) {
    if (err) return console.log(err);
    return 'Updated';
    });
}

function saveNote(note) {
    // add new note to db array
    db.push(note);
    // write new state of db to the .json file
    saveDB();
}

// Write a server for the designated port
server.listen(PORT, function() {
    console.log(`Server is running on port ${PORT}`);
});


/*

FIRST DO THIS:

npm install nodemon -g

then from now on instead of using 'node filename.js' to run your program, 
use 'nodemon filename.js' to run it. Then whenever you make a change, you won't 
have to stop and restart the server. it will do that for you.


So in Node.js version 4 and above you have to install 'body-parser' separately
 -npm install body-parser --save

Then include these in your app at the top
  const bodyParser = require('body-parser');
  server.use(bodyParser.urlencoded({ extended: true }));

Then when data from the front end comes in, like from a form or from an http request
made with javascript, then you can do:
  req.body to get at all that data.

To take in data and update the json File:

1. get the data from the json File. You already have this on line 8
2. get the data from the html and make a new object
    let note = {id: db.length + 1, title: req.body.title, req.body.message};
      id - get the current length of the db and add 1 for the new note
      title and message - if using a form, then you have to give a name attribute to the input and textarea fields
        this is what you will refer to via req.body.title where 'title' is the value of the name attribute given.

Here is the form from notes.html:

 <form action="/api/notes" method="POST">
  <input class="note-title" name="title" placeholder="Note Title" maxlength="28" type="text">
  <br>
  <textarea class="note-textarea" name="message" placeholder="Note Text"></textarea>
  <br>
  <input type="submit">
</form>

3. db is an array of objects so just push the new object onto the db
   db.push(note)
4. write the current version of the db to the db.json file
    fs.writeFile('./db.json', JSON.stringify(db), function writeJSON(err) {
      if (err) return console.log(err);
      return 'Updated';
    });
5. now you can redirect to the notes path or where ever
    res.redirect("/api/notes");


*/