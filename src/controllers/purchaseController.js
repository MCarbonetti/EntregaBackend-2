const CartRepo = require('../repositories/CartRepository');
const prodRepo = require('../repositories/ProductRepository');
const TicketRepo = require('../repositories/TicketRepository');
const ticketService = require('../services/ticketService');
exports.purchase = async (req,res) => {
  const userId = req.user.id, email = req.user.email;
  const cart = await new CartRepo().getByUser(userId);
  if(!cart || !cart.products.length) return res.status(400).send('Cart empty');
  let amount = 0;
  for(const item of cart.products) {
    const p = await prodRepo.getById(item.product);
    if(p.stock < item.quantity) return res.status(400).send('Insufficient stock');
    p.stock -= item.quantity;
    await prodRepo.update(p._id, { stock:p.stock });
    amount += p.price * item.quantity;
  }
  const ticket = ticketService.createTicket(email, amount);
  await new TicketRepo().create(ticket);
  cart.products = [];
  await new CartRepo().update(cart._id, cart);
  res.json(ticket);
};
