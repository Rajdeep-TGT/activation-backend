// functions/checkKeyStatus.js
const { activationKeys } = require('../db');

module.exports = async function (context, req) {
  const { key } = req.query;

  if (!key) {
    context.res = {
      status: 400,
      body: { valid: false, error: "Missing key." }
    };
    return;
  }

  const exists = activationKeys.find(entry => entry.key === key);

  context.res = {
    status: exists ? 200 : 404,
    body: { valid: !!exists }
  };
};
