const UserDao = require('../daos/UserDao');
class UserRepository {
  constructor() { this.dao = new UserDao(); }
  create(user) { return this.dao.create(user); }
  findByEmail(email) { return this.dao.findByEmail(email); }
  findById(id) { return this.dao.findById(id); }
  update(id, data) { return this.dao.update(id, data); }
}
module.exports = UserRepository;
