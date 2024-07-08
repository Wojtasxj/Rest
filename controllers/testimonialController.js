const Testimonial = require('../models/testimonial');

exports.getAllTestimonials = async (req, res) => {
    try {
        const testimonials = await Testimonial.find();
        res.json(testimonials);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getTestimonialById = async (req, res) => {
    res.json(res.testimonial);
};

exports.getRandomTestimonial = async (req, res) => {
    try {
        const count = await Testimonial.countDocuments();
        if (count === 0) {
            return res.status(404).json({ message: 'No testimonials available' });
        }
        const randomIndex = Math.floor(Math.random() * count);
        const randomTestimonial = await Testimonial.findOne().skip(randomIndex);
        res.json(randomTestimonial);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createTestimonial = async (req, res) => {
    const { author, text } = req.body;

    try {
        const newTestimonial = new Testimonial({ author, text });
        const savedTestimonial = await newTestimonial.save();
        res.status(201).json(savedTestimonial);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateTestimonial = async (req, res) => {
    const { author, text } = req.body;
    if (author) res.testimonial.author = author;
    if (text) res.testimonial.text = text;

    try {
        const updatedTestimonial = await res.testimonial.save();
        res.json(updatedTestimonial);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteTestimonial = async (req, res) => {
    try {
        await res.testimonial.remove();
        res.json({ message: 'Testimonial deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getTestimonial = async (req, res, next) => {
    try {
        const testimonial = await Testimonial.findById(req.params.id);
        if (testimonial == null) {
            return res.status(404).json({ message: 'Testimonial not found' });
        }
        res.testimonial = testimonial;
        next();
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};
