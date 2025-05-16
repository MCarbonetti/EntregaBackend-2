const User = require('../models/User');
class UserDao {
  async create(user) { return User.create(user); }
  async findByEmail(email) { return User.findOne({ email }); }
  async findById(id) { return User.findById(id); }
  async update(id, data) { return User.findByIdAndUpdate(id, data); }
}
module.exports = UserDao;
