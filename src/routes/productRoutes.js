const router = require('express').Router();
const ctrl = require('../controllers/productController');
const auth = require('../middlewares/auth');
router.post('/', auth, ctrl.createProduct);
router.get('/', ctrl.listProducts);
router.get('/:id', ctrl.getProduct);
module.exports = router;
