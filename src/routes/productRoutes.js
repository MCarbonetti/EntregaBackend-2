const r = require('express').Router();
const auth = require('../middlewares/authMiddleware');
const role = require('../middlewares/roleMiddleware');
const ctrl = require('../controllers/productController');
r.get('/', ctrl.getAll);
r.get('/:id', ctrl.getById);
r.post('/', auth, role('admin'), ctrl.create);
r.put('/:id', auth, role('admin'), ctrl.update);
r.delete('/:id', auth, role('admin'), ctrl.delete);
module.exports = r;
