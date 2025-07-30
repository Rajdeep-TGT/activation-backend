// db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Atlas connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

const ActivationKeySchema = new mongoose.Schema({
  email: String,
  country: String,
  key: String,
  transaction_id: String,
  created: { type: Date, default: Date.now },
});

const ActivationKey = mongoose.model('ActivationKey', ActivationKeySchema);

const saveActivationKeyToMongo = async ({ email, country, key, transaction_id }) => {
  try {
    const newKey = new ActivationKey({
      email,
      country,
      key,
      transaction_id,
    });
    await newKey.save();
    console.log('✅ Key saved to MongoDB:', newKey);
  } catch (err) {
    console.error('❌ Failed to save to MongoDB:', err);
  }
};

// ✅ Export everything together
module.exports = {
  connectDB,
  ActivationKey,
  saveActivationKeyToMongo,
};
