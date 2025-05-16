const Cart = require('../models/Cart');
class CartDao {
  async getByUser(userId) { return Cart.findOne({ user: userId }).populate('products.product'); }
  async create(userId) { return Cart.create({ user: userId, products: [] }); }
  async update(id, data) { return Cart.findByIdAndUpdate(id, data, { new: true }); }
}
module.exports = CartDao;
