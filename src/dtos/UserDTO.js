class UserDTO {
  constructor({ _id, email, role }) {
    this.id = _id;
    this.email = email;
    this.role = role;
  }
}
module.exports = UserDTO;
