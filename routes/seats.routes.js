const express = require('express');
const router = express.Router();
const seatController = require('../controllers/seatController');

router.get('/seats', seatController.getAllSeats);

router.get('/seats/:id', seatController.getSeat, seatController.getSeatById);

router.post('/seats', seatController.createSeat);

router.put('/seats/:id', seatController.getSeat, seatController.updateSeat);

router.delete('/seats/:id', seatController.getSeat, seatController.deleteSeat);

module.exports = router;