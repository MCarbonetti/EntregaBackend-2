const crypto = require('crypto');
exports.generateToken = () => {
  const token = crypto.randomBytes(20).toString('hex');
  return { token, expiry: Date.now() + 3600000 };
};
