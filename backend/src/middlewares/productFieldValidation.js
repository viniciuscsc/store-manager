const productFieldValidation = (req, res, next) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: 'Nome do produto não foi informado' });
  return next();
};

module.exports = productFieldValidation;
