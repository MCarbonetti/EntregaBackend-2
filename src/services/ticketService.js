const { v4: uuidv4 } = require('uuid');
exports.createTicket = (email, amount) => ({
  code: uuidv4(),
  purchaseDate: new Date(),
  amount,
  purchaser: email
});
