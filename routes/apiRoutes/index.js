const fs = require('fs');
const path = require('path');
const router = require('express').Router();
const uniqid = require('uniqid'); 

var { notes } = require('../../db/db');

router.get('/notes', (req, res) => {
  res.json(notes);
});

router.delete('/notes/:id', (req, res) => {
  const id = req.params.id;

  notes = notes.filter(function(note) { return note.id != id }); 

  console.log(notes);

  fs.writeFileSync(
    path.join(__dirname, '../../db/db.json'),
    JSON.stringify({ notes }, null, 2)
  );

  res.json(notes);

  // if (result) {
  //   res.json(result);
  // } else {
  //   res.send(404);
  // }
});

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
