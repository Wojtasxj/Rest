const express = require('express');
const cors = require('cors');
const testimonialsRoutes = require('./routes/testimonials.routes.js');
const concertRoutes = require('./routes/concerts.routes.js');
const seatsRoutes = require('./routes/seats.routes.js');
const path = require('path');

const socketIO = require('socket.io');
const mongoose = require('mongoose');

const app = express();
const server = require('http').createServer(app);
const io = socketIO(server);

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

io.on('connection', (socket) => {
    console.log('New socket!');
});

mongoose.connect('mongodb+srv://wojtasxj:YEyZB9zYKmoId7PX@cluster0.kum70so.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(() => {
    console.log('Connected to the database');
})
.catch((err) => {
    console.error('Error connecting to the database:', err.message);
});

server.listen(process.env.PORT || 8000, () => {
    console.log('Server is running on port: 8000');
});
