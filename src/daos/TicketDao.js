const Ticket = require('../models/Ticket');
class TicketDao {
  async create(ticket) { return Ticket.create(ticket); }
}
module.exports = TicketDao;
