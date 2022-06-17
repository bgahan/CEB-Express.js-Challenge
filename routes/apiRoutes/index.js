const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const { notes } = require('../../db/db.json');

// function to create a new note
function createNewNote(body, notesArray) {
     const note = body;
     notesArray.push(note);
     fs.writeFileSync(
         path.join(__dirname, '../../db/db.json'),
         JSON.stringify({ notes: notesArray }, null, 2)
     );
 
     // return finished code to post route for response
     return note;
 }


// get all notes
router.get('/notes', (req, res) => {
     res.json(notes);
});

// create a new note
router.post('/notes', (req, res) => {
     req.body.id = notes.length.toString();

     const note = createNewNote(req.body, notes);
     res.json(note);
});

// delete a note
router.delete('/notes/:id', (req, res) => {
     res.json(notes);
});

module.exports = router;