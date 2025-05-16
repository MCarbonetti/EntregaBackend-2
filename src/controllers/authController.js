const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserRepository = require('../repositories/UserRepository');
const UserDTO = require('../dtos/UserDTO');
const mailService = require('../services/mailService');
const tokenService = require('../services/tokenService');
const repo = new UserRepository();

exports.register = async (req,res) => {
  const { email,password } = req.body;
  const hashed = await bcrypt.hash(password,10);
  await repo.create({ email, password: hashed });
  res.status(201).send('Registered');
};

exports.login = async (req,res) => {
  const { email,password } = req.body;
  const user = await repo.findByEmail(email);
  if(!user || !await bcrypt.compare(password,user.password)) return res.status(401).send('Invalid');
  const token = jwt.sign({ id:user._id,role:user.role },process.env.JWT_SECRET,{ expiresIn:'1h' });
  res.json({ token });
};

exports.current = async (req,res) => {
  const dto = new UserDTO(req.user);
  res.json(dto);
};

exports.requestReset = async (req,res) => {
  const { email } = req.body;
  const user = await repo.findByEmail(email);
  if(!user) return res.sendStatus(200);
  const { token, expiry } = tokenService.generateToken();
  await repo.update(user._id,{ resetToken:token, resetTokenExpiry:expiry });
  const link = `http://localhost:3000/api/auth/reset/${token}`;
  await mailService.sendReset(email,link);
  res.send('Reset email sent');
};

exports.resetPassword = async (req,res) => {
  const { token } = req.params;
  const { password } = req.body;
  const user = await repo.dao.model.findOne({ resetToken:token, resetTokenExpiry:{$gt:Date.now()} });
  if(!user) return res.status(400).send('Invalid or expired');
  if(await bcrypt.compare(password,user.password)) return res.status(400).send('Cannot reuse');
  const hashed = await bcrypt.hash(password,10);
  user.password = hashed;
  user.resetToken = undefined;
  user.resetTokenExpiry = undefined;
  await user.save();
  res.send('Password reset');
};
