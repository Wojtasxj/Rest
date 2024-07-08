const express = require('express');
const router = express.Router();
const concertController = require('../controllers/concertController');

router.get('/concerts', concertController.getAllConcerts);

router.get('/concerts/:id', concertController.getConcertById);

router.post('/concerts', concertController.createConcert);

router.put('/concerts/:id', concertController.updateConcert);

router.delete('/concerts/:id', concertController.deleteConcert);

module.exports = router;