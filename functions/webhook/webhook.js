// webhook.js
const { ActivationKey } = require('../../db');

async function saveActivationKeyToMongo({ email, country, key, transaction_id }) {
  try {
    const newKey = new ActivationKey({ email, country, key, transaction_id });
    await newKey.save();
    console.log('✅ Key saved to MongoDB:', newKey);
  } catch (err) {
    console.error('❌ Failed to save to MongoDB:', err);
  }
}

module.exports = {
  saveActivationKeyToMongo,
};
