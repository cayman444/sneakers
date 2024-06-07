const Product = require('../models/Product');

class ProductController {
  async productSave(req, res) {
    try {
      const products = req.body;
      products.forEach((product) => {
        const newProduct = new Product(product);
        newProduct.save();
      });
      res.json({ message: 'Продукты созданы' });
    } catch (e) {
      res.json('Ошибка при создании Продуктов');
    }
  }

  async productRender(req, res) {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (e) {
      res.json('Ошибка при получении продуктов');
    }
  }
}

module.exports = new ProductController();
