const r = require('express').Router();
const auth = require('../middlewares/authMiddleware');
const role = require('../middlewares/roleMiddleware');
const ctrl = require('../controllers/cartController');
r.post('/add', auth, role('user'), ctrl.addProduct);
module.exports = r;
