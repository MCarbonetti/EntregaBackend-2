const CartDao = require('../daos/CartDao');
class CartRepository {
  constructor() { this.dao = new CartDao(); }
  getByUser(userId) { return this.dao.getByUser(userId); }
  create(userId) { return this.dao.create(userId); }
  update(id,data) { return this.dao.update(id,data); }
}
module.exports = CartRepository;
