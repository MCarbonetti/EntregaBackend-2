const CartRepo = require('../repositories/CartRepository');
const prodRepo = require('../repositories/ProductRepository');
const cartRepo = new CartRepo();
exports.addProduct = async (req,res) => {
  const userId = req.user.id;
  let cart = await cartRepo.getByUser(userId);
  if(!cart) cart = await cartRepo.create(userId);
  const { productId, quantity } = req.body;
  const prod = await prodRepo.getById(productId);
  if(!prod || prod.stock < quantity) return res.status(400).send('Insufficient stock');
  const item = cart.products.find(i => i.product.equals(productId));
  if(item) item.quantity += quantity;
  else cart.products.push({ product:productId, quantity });
  await cartRepo.update(cart._id, cart);
  res.send('Added');
};
