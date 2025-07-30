// utils/generateKey.js
const crypto = require('crypto');

function generateActivationKey() {
  return crypto.randomBytes(16).toString('hex'); // 32-char unique key
}

module.exports = {
  generateActivationKey,
};

// ⬇️ Add this for testing:
if (require.main === module) {
  console.log("Generated Key:", generateActivationKey());
}
