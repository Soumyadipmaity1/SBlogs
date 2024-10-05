const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const postRoutes = require('./routes/post');

dotenv.config();
const app = express();

app.use(cors({
  origin: ['http://localhost:3000', 'https://s-blogs.vercel.app'],
  credentials: true
}));
app.use(express.json());

console.log('Environment:', process.env.NODE_ENV);
console.log('MONGO_URI:', process.env.MONGO_URI);
console.log('Attempting to connect to MongoDB...');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("Connected to MongoDB successfully");
})
.catch(err => {
  console.error("Failed to connect to MongoDB:", err);
  process.exit(1);
});

app.use('/api/posts', postRoutes);

// Add a test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working!', env: process.env.NODE_ENV });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Something broke!', details: err.message });
});

// For local development and Vercel
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
