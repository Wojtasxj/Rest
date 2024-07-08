
const Seat = require('../models/seat');

exports.getAllSeats = async (req, res) => {
    try {
        const seats = await Seat.find();
        res.json(seats);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getSeatById = async (req, res) => {
    res.json(res.seat);
};

exports.createSeat = async (req, res) => {
    const { day, seat, client, email } = req.body;
    
    try {
        const isSeatTaken = await Seat.findOne({ day, seat });
        if (isSeatTaken) {
            return res.status(400).json({ message: 'The slot is already taken' });
        }

        const newSeat = new Seat({ day, seat, client, email });

        const savedSeat = await newSeat.save();
        req.io.emit('seatsUpdated', savedSeat);
        res.status(201).json(savedSeat);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateSeat = async (req, res) => {
    const { day, seat, client, email } = req.body;
    if (day) res.seat.day = day;
    if (seat) res.seat.seat = seat;
    if (client) res.seat.client = client;
    if (email) res.seat.email = email;

    try {
        const updatedSeat = await res.seat.save();
        res.json(updatedSeat);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteSeat = async (req, res) => {
    try {
        await res.seat.remove();
        res.json({ message: 'Seat deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getSeat = async (req, res, next) => {
    try {
        const seat = await Seat.findById(req.params.id);
        if (seat == null) {
            return res.status(404).json({ message: 'Seat not found' });
        }
        res.seat = seat;
        next();
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};
