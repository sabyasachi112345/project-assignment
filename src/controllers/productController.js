const Product = require('../models/Product');

// Create
exports.createProduct = async (req, res) => {
  try {
    const payload = { ...req.body, createdBy: req.user.id };
    const p = await Product.create(payload);
    res.json(p);
  } catch(e){ res.status(500).json({ error: e.message }); }
};

// List
exports.listProducts = async (req, res) => {
  const products = await Product.find().sort({ createdAt:-1 });
  res.json(products);
};

// Get single
exports.getProduct = async (req, res) => {
  const p = await Product.findById(req.params.id);
  if (!p) return res.status(404).json({ msg: 'Not found' });
  res.json(p);
};
