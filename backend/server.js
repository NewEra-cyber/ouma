const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

const Lead = require('./models/Lead');

const app = express();
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.log('❌ MongoDB Connection Error:', err));

// --- ROUTES ---

// 1. Get Services (hardcoded for now)
app.get('/api/services', async (req, res) => {
  const services = [
    { id: 1, title: 'Architectural 3D Renders', desc: 'Concept planning & detailed architectural designs', icon: 'Ruler' },
    { id: 5, title: '2D Floor plans', desc: 'Photoreal 3D visualization & renderings', icon: 'Box' },
    { id: 6, title: 'Site Supervision', desc: 'Photoreal 3D visualization & renderings', icon: 'Box' },
    { id: 2, title: 'Actual build and construction', desc: 'End-to-end building & construction management', icon: 'HardHat' },
    { id: 7, title: 'BOQS', desc: 'Photoreal 3D visualization & renderings', icon: 'Box' },
    { id: 4, title: '3D Renders', desc: 'Photoreal 3D visualization & renderings', icon: 'Box' },
  ];
  res.json(services);
});

// 2. Submit a Lead
app.post('/api/leads', async (req, res) => {
  try {
    const newLead = new Lead(req.body);
    await newLead.save();
    res.status(201).json({ success: true, message: 'Inquiry received!' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 3. Get all leads (PROTECTED — requires password header)
app.get('/api/leads', async (req, res) => {
  const password = req.headers['x-admin-password'];
  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ success: false, error: 'Unauthorized' });
  }
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.json(leads);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));