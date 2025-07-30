// functions/generateKey.js
const { v4: uuidv4 } = require('uuid');
const ActivationKey = require('../models/ActivationKey');

module.exports = async function (context, req) {
  const { email, country, product_id, transaction_id } = req.body || {};

  // 1. Validate input
  if (!email || !country || !product_id || !transaction_id) {
    context.res = {
      status: 400,
      body: { error: "Missing required fields." }
    };
    return;
  }

  // 2. Generate activation key
  const key = `TGT-${country.slice(0, 3).toUpperCase()}-${uuidv4().slice(0, 4).toUpperCase()}-${uuidv4().slice(0, 4).toUpperCase()}`;

  try {
    // 3. Save to MongoDB
    const newKey = new ActivationKey({
      key,
      email,
      country,
      productId: product_id,
      transactionId: transaction_id,
      status: 'active'
    });

    await newKey.save();

    // 4. Return success response
    context.res = {
      status: 200,
      body: {
        success: true,
        key
      }
    };
  } catch (err) {
    console.error('MongoDB Save Error:', err);
    context.res = {
      status: 500,
      body: { error: 'Internal server error. Could not store activation key.' }
    };
  }
};
