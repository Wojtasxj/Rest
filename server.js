const express = require('express');
const cors = require('cors');
const testimonialsRoutes = require('./routes/testimonials.routes.js');
const concertRoutes = require('./routes/concerts.routes.js');
const seatsRoutes = require('./routes/seats.routes.js');


const app = express();
const port = 8000;


app.use(cors());
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use('/api', testimonialsRoutes);
app.use('/api', concertRoutes);
app.use('/api', seatsRoutes);

app.use((req, res) => {
    res.status(404).json({ message: 'Not found.!.' });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});