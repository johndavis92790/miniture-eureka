const fs = require('fs');
const path = require('path');
const router = require('express').Router();
const uniqid = require('uniqid'); 

var { notes } = require('../../db/db');

//get route to get all notes
router.get('/notes', (req, res) => {
  if (notes) {
    res.json(notes);
  } else {
    res.send(404);
  }
});

//delete route to delete specific note based on id#
router.delete('/notes/:id', (req, res) => {
  const id = req.params.id;
  notes = notes.filter(function(note) { return note.id != id }); 

  fs.writeFileSync(
    path.join(__dirname, '../../db/db.json'),
    JSON.stringify({ notes }, null, 2)
  );

  if (notes) {
    res.json(notes);
  } else {
    res.send(404);
  }
});

//post route to create a new note, assings a new id# to each new note
router.post('/notes', (req, res) => {
  const id = uniqid();
  const title = req.body.title;
  const text = req.body.text;

  let objText = 
  `{ 
      "id": "` + id + `", 
      "title": "` + title + `", 
      "text": "` + text + `" 
    }`;

  const obj = JSON.parse(objText);
  notes.push(obj);

  fs.writeFileSync(
    path.join(__dirname, '../../db/db.json'),
    JSON.stringify({ notes }, null, 2)
  );

  res.json(notes);
});

module.exports = router;
