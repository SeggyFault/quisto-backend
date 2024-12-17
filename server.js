const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/quisto");

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB")
});

// Models
const User = require('./models/User');

// Routes

// Checkup
app.get('/', (req, res) => {
  res.send('Backend API is working');
});

// DB Checkup
app.get('/api/test-db', async (req, res) => {
  try {
    await mongoose.connection.db.admin().ping();
    res.status(200).json({ message: 'Database connected' });
  } catch (err) {
    res.status(500).json({ message: 'Database connection failed', error: err.message });
  }
});


// Register
app.post('/api/register', async (req, res) => {
  const { pob, email, password  } = req.body;

  if (!pob || !email || !password ) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const user = new User({ pob, email, password });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error registering user', error: err.message });
  }
});


const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
