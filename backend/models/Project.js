const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, enum: ['Luxury', 'Renovation', 'Rental'], default: 'Luxury' },
  imageUrl: { type: String, required: true },
  description: { type: String },
});

module.exports = mongoose.model('Project', ProjectSchema);