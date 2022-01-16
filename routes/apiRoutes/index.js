
const router = require('express').Router();
const uniqid = require('uniqid'); 



const notes = require('../../db/db');

router.get('/notes', (req, res) => {
  res.json(notes);
});

router.get('/notes/:id', (req, res) => {
  const result = findById(req.params.id, notes);
  if (result) {
    res.json(result);
  } else {
    res.send(404);
  }
});

router.post('/notes', (req, res) => {
  // const resJson = req.body;
  console.log('req', req.body);
  // console.log('res', res);
  const id = uniqid();
  console.log(id);

  // JSON.stringify({ id }, null, 0)

  var postNote = req.body;
  postNote.push(id);

  console.log(postNote);
  // const newNote = createNewNote(req.body, notes);

  
  res.json(postNote);
  
});

module.exports = router;
