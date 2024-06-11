const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('./../db/db.js');

router.get('/seats', (req, res) => {
  res.json(db.seats);
});

router.get('/seats/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const seat = db.seats.find(s => s.id === id);
  if (seat) {
    res.json(seat);
  } else {
    res.status(404).json({ message: 'Seat not found' });
  }
});

router.post('/seats', (req, res) => {
  const { day, seat, client, email } = req.body;
  
  const isSeatTaken = db.seats.some(s => s.day === day && s.seat === seat);

  if (isSeatTaken) {
    return res.status(400).json({ message: 'The slot is already taken...' });
  }

  const newSeat = {
    id: uuidv4(),
    day,
    seat,
    client,
    email
  };
  db.seats.push(newSeat);
  res.json({ message: 'OK' });
});

router.put('/seats/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { day, seat, client, email } = req.body;
    const seatData = db.seats.find(s => s.id === id);
    if (seatData) {
      seatData.day = day;
      seatData.seat = seat;
      seatData.client = client;
      seatData.email = email;
      res.json({ message: 'OK' });
    } else {
      res.status(404).json({ message: 'Seat not found' });
    }
  });
  
  router.delete('/seats/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = db.seats.findIndex(s => s.id === id);
    if (index !== -1) {
      db.seats.splice(index, 1);
      res.json({ message: 'OK' });
    } else {
      res.status(404).json({ message: 'Seat not found' });
    }
  });
  
  module.exports = router;