const { getSaleById } = require('../models/salesModel');

const existingSaleValidation = async (req, res, next) => {
  const { id } = req.params;
  const [sale] = await getSaleById(id);
  if (!sale) return res.status(404).json({ message: 'Sale not found' });
  next();
};

module.exports = existingSaleValidation;
