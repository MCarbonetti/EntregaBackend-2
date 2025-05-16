const { Schema, model } = require('mongoose');
const ticketSchema = new Schema({
  code: String,
  purchaseDate: Date,
  amount: Number,
  purchaser: String
});
module.exports = model('Ticket', ticketSchema);
