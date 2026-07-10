const express = require('express');
const router = express.Router();
const Testimonial = require('../models/Testimonial');

// GET all approved testimonials
router.get('/', async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ approved: true }).sort({ order: 1, createdAt: -1 });
    res.json(testimonials);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST create testimonial
router.post('/', async (req, res) => {
  try {
    const { name, role, company, message, avatarUrl } = req.body;
    if (!name || !role || !company || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const testimonial = new Testimonial({ name, role, company, message, avatarUrl });
    await testimonial.save();
    res.status(201).json(testimonial);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE testimonial
router.delete('/:id', async (req, res) => {
  try {
    await Testimonial.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
