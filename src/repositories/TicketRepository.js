const TicketDao = require('../daos/TicketDao');
class TicketRepository {
  constructor() { this.dao = new TicketDao(); }
  create(ticket) { return this.dao.create(ticket); }
}
module.exports = TicketRepository;
