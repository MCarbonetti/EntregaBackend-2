const r = require('express').Router();
const auth = require('../middlewares/authMiddleware');
const ctrl = require('../controllers/purchaseController');
r.post('/', auth, ctrl.purchase);
module.exports = r;
