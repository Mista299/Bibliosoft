require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');

const connectDB = async (MONGO_URI) => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1); // Termina la aplicación si no puede conectarse
  }
};

module.exports = connectDB;
