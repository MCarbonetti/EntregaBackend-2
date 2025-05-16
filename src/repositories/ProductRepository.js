const ProductDao = require('../daos/ProductDao');
class ProductRepository {
  constructor() { this.dao = new ProductDao(); }
  getAll() { return this.dao.getAll(); }
  getById(id) { return this.dao.getById(id); }
  create(prod) { return this.dao.create(prod); }
  update(id,data) { return this.dao.update(id,data); }
  delete(id) { return this.dao.delete(id); }
}
module.exports = ProductRepository;
