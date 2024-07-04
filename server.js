const express = require('express');
const cors = require('cors');
const testimonialsRoutes = require('./routes/testimonials.routes.js');
const concertRoutes = require('./routes/concerts.routes.js');
const seatsRoutes = require('./routes/seats.routes.js');
const path = require('path');

// Dodajemy import Socket.IO
const socketIO = require('socket.io');

const app = express();
const server = require('http').createServer(app); // Tworzymy serwer HTTP na podstawie aplikacji Express
const io = socketIO(server); // Tworzymy instancję Socket.IO na podstawie serwera HTTP

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
    req.io = io;
    next();
  });

app.use('/api', testimonialsRoutes);
app.use('/api', concertRoutes);
app.use('/api', seatsRoutes);
app.use(express.static(path.join(__dirname, '/client/build')));




app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
    res.status(404).json({ message: 'Not found.!.' });
});

// Nasłuchujemy na event 'connection'
io.on('connection', (socket) => {
    console.log('New socket!');
});

server.listen(process.env.PORT || 8000, () => {
    console.log('Server is running on port: 8000');
});