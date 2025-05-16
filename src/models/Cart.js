const { Schema, model } = require('mongoose');
const cartSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  products: [{ product: { type: Schema.Types.ObjectId, ref: 'Product' }, quantity: Number }]
});
module.exports = model('Cart', cartSchema);
