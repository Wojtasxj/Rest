const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('./../db/db.js');


router.get('/concerts', (req, res) => {
  res.json(db.concerts);
});


router.get('/concerts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const concert = db.concerts.find(c => c.id === id);
  if (concert) {
    res.json(concert);
  } else {
    res.status(404).json({ message: 'Concert not found' });
  }
});


router.post('/concerts', (req, res) => {
  const { performer, genre, price, day, image } = req.body;
  const newConcert = {
    id: uuidv4(),
    performer,
    genre,
    price,
    day,
    image
  };
  db.concerts.push(newConcert);
  res.json({ message: 'OK' });
});


router.put('/concerts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { performer, genre, price, day, image } = req.body;
  const concert = db.concerts.find(c => c.id === id);
  if (concert) {
    concert.performer = performer;
    concert.genre = genre;
    concert.price = price;
    concert.day = day;
    concert.image = image;
    res.json({ message: 'OK' });
  } else {
    res.status(404).json({ message: 'Concert not found' });
  }
});


router.delete('/concerts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = db.concerts.findIndex(c => c.id === id);
  if (index !== -1) {
    db.concerts.splice(index, 1);
    res.json({ message: 'OK' });
  } else {
    res.status(404).json({ message: 'Concert not found' });
  }
});

module.exports = router;
