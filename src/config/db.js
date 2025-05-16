const mongoose = require('mongoose');
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');
  } catch (e) {
    console.error('DB connection error', e);
  }
};
module.exports = { connectDB };
