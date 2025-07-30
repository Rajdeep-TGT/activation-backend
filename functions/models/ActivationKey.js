// models/ActivationKey.js
const mongoose = require('mongoose');

const ActivationKeySchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  country: { type: String },
  productId: { type: String },
  transactionId: { type: String },
  status: { type: String, enum: ['active', 'used', 'revoked'], default: 'active' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ActivationKey', ActivationKeySchema);
