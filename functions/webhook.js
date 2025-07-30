// functions/webhook.js
const { generateActivationKey } = require('../utils/generateKey');
const { saveToDatabase } = require('../db');

module.exports = async function (context, req) {
  const { email, country } = req.body;

  const key = generateActivationKey();
  await saveToDatabase({ email, country, key });

  context.res = {
    status: 200,
    body: { success: true, key }
  };
};
