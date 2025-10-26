const router = require('express').Router();
const ctrl = require('../controllers/orderController');
const auth = require('../middlewares/auth');
router.post('/create', auth, ctrl.createOrder);
router.post('/verify', auth, ctrl.verifyPayment);
module.exports = router;
