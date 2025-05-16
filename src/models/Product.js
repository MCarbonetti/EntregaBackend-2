const { Schema, model } = require('mongoose');
const productSchema = new Schema({
  name: String,
  price: Number,
  stock: Number
});
module.exports = model('Product', productSchema);
