const Product = require('../models/Product');
class ProductDao {
  async getAll() { return Product.find(); }
  async getById(id) { return Product.findById(id); }
  async create(prod) { return Product.create(prod); }
  async update(id, data) { return Product.findByIdAndUpdate(id, data); }
  async delete(id) { return Product.findByIdAndDelete(id); }
}
module.exports = ProductDao;
