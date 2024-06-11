const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('./../db/db.js');

router.get('/testimonials', (req, res) => {
    res.json(db.testimonials);
  });
  
router.get('/testimonials/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const testimonial = db.testimonials.find(t => t.id === id);
    if (testimonial) {
      res.json(testimonial);
    } else {
      res.status(404).json({ message: 'Testimonial not found' });
    }
  });
  
  router.get('/testimonials/random', (req, res) => {
    if (db.testimonials.length > 0) {
      const randomIndex = Math.floor(Math.random() * db.testimonials.length);
      const randomTestimonial = db.testimonials[randomIndex];
      res.json(randomTestimonial);
    } else {
      res.status(404).json({ message: 'No testimonials available' });
    }
  });
  
  router.post('/testimonials', (req, res) => {
    const { author, text } = req.body;
    const newTestimonial = {
      id: uuidv4(),
      author,
      text
    };
    db.testimonials.push(newTestimonial);
    res.json({ message: 'OK' });
  });
  
  router.put('/testimonials/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { author, text } = req.body;
    const testimonial = db.testimonials.find(t => t.id === id);
    if (testimonial) {
      testimonial.author = author;
      testimonial.text = text;
      res.json({ message: 'OK' });
    } else {
      res.status(404).json({ message: 'Testimonial not found' });
    }
  });
  
router.delete('/testimonials/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = db.testimonials.findIndex(t => t.id === id);
    if (index !== -1) {
      db.testimonials.splice(index, 1);
      res.json({ message: 'OK' });
    } else {
      res.status(404).json({ message: 'Testimonial not found' });
    }
  });
  
  module.exports = router;