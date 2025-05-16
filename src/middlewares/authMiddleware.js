const jwt = require('jsonwebtoken');
const UserRepo = require('../repositories/UserRepository');
module.exports = async (req,res,next) => {
  const auth = req.headers.authorization;
  if(!auth) return res.sendStatus(401);
  const token = auth.split(' ')[1];
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await new UserRepo().findById(data.id);
    next();
  } catch {
    res.sendStatus(401);
  }
};
