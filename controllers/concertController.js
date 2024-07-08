const Concert = require('../models/concert');

// Pobranie wszystkich koncertów
exports.getAllConcerts = async (req, res) => {
    try {
        const concerts = await Concert.find();
        res.json(concerts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Pobranie koncertu po ID
exports.getConcertById = async (req, res) => {
    res.json(res.concert);
};

// Dodanie nowego koncertu
exports.createConcert = async (req, res) => {
    const { performer, genre, price, day, image } = req.body;
    const newConcert = new Concert({ performer, genre, price, day, image });

    try {
        const savedConcert = await newConcert.save();
        res.status(201).json(savedConcert);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Aktualizacja koncertu
exports.updateConcert = async (req, res) => {
    const { performer, genre, price, day, image } = req.body;
    if (performer) res.concert.performer = performer;
    if (genre) res.concert.genre = genre;
    if (price) res.concert.price = price;
    if (day) res.concert.day = day;
    if (image) res.concert.image = image;

    try {
        const updatedConcert = await res.concert.save();
        res.json(updatedConcert);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Usunięcie koncertu
exports.deleteConcert = async (req, res) => {
    try {
        await res.concert.remove();
        res.json({ message: 'Concert deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};