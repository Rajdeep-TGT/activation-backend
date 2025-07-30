//webook// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB, saveActivationKeyToMongo } = require('../../db'); // ✅ this is correct

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Activation route using MongoDB
app.post('/api/activate', async (req, res) => {
  const { email, country, transaction_id } = req.body;

  if (!email || !country || !transaction_id) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  const key = `TGT-${country.toUpperCase().slice(0, 3)}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
  console.log('Generated key:', key);

  await saveActivationKeyToMongo({ email, country, key, transaction_id });

  console.log(`Simulated sending email to ${email}`);
  return res.status(200).json({ message: 'Activation key generated and sent to email.', key });
});

// ✅ Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
  connectDB();
});
