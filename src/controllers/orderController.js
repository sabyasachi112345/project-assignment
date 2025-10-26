const Order = require('../models/Order');
const Razorpay = require('razorpay');

const razor = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

exports.createOrder = async (req, res) => {
  try {
    const { items, amount } = req.body; // server trusts client? validate on DB in prod
    const options = {
      amount: Math.round(amount * 100), // in paise
      currency: 'INR',
      receipt: `rcpt_${Date.now()}`,
    };
    const razorOrder = await razor.orders.create(options);
    const dbOrder = await Order.create({
      user: req.user.id,
      items,
      amount,
      razorpayOrderId: razorOrder.id,
      status: 'created'
    });
    res.json({ razorOrder, order: dbOrder });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

// webhook or capture - verify signature and update order status accordingly
exports.verifyPayment = async (req, res) => {
  // For production, use webhook; or verify signature from client
  res.json({ ok:true });
};
