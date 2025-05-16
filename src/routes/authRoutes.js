const r = require('express').Router();
const auth = require('../middlewares/authMiddleware');
const ctrl = require('../controllers/authController');
r.post('/register', ctrl.register);
r.post('/login', ctrl.login);
r.get('/current', auth, ctrl.current);
r.post('/request-reset', ctrl.requestReset);
r.post('/reset/:token', ctrl.resetPassword);
module.exports = r;
