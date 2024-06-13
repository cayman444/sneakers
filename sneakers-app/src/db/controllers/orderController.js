const Order = require('../models/Order');

class OrderController {
  async sendOrder(req, res) {
    try {
      const { userName, phone, email, date, totalSum, products } = req.body;
      const { userId } = req;

      if (!userName || !phone || !email || !products || !userId || !date) {
        return res.status(400).json({ message: 'Не все поля заполнены' });
      }

      const newOrder = new Order({ userName, phone, email, products, totalSum, userId, date });

      newOrder.save();

      res.json({ message: 'Заявка отправлена' });
    } catch (e) {
      console.log(e);
      res.json({ message: 'Ошибка с отправкой заявки' });
    }
  }

  async getOrders(req, res) {
    try {
      const { userId } = req;
      const productsInfo = await Order.find({ userId });

      if (!productsInfo) {
        return res.status(400).json({ message: `Ошибка с получением пользователя` });
      }

      const products = productsInfo.reduce((acc, { _id: orderId, products: orderProducts, totalSum, date }) => {
        acc.push({ orderProducts, orderId, totalSum, date });
        return acc;
      }, []);

      res.json(products);
    } catch (e) {
      console.log(e);
      res.json({ message: 'Ошибка с получением заказов' });
    }
  }
}

module.exports = new OrderController();
