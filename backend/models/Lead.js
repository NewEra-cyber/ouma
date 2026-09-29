const mongoose = require('mongoose');

const LeadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  projectType: { type: String },
  budget: { type: String },
  timeline: { type: String },
  message: { type: String },
  source: { type: String, default: 'hero-button' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Lead', LeadSchema);