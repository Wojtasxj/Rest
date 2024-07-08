const express = require('express');
const router = express.Router();
const testimonialController = require('../controllers/testimonialController');

router.get('/testimonials', testimonialController.getAllTestimonials);

router.get('/testimonials/:id', testimonialController.getTestimonial, testimonialController.getTestimonialById);

router.get('/testimonials/random', testimonialController.getRandomTestimonial);

router.post('/testimonials', testimonialController.createTestimonial);

router.put('/testimonials/:id', testimonialController.getTestimonial, testimonialController.updateTestimonial);

router.delete('/testimonials/:id', testimonialController.getTestimonial, testimonialController.deleteTestimonial);

module.exports = router;