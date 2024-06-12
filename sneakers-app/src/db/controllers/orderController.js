const Order = require('../models/Order');

class OrderController {
  async sendOrder(req, res) {
    try {
      const { userName, phone, email, date } = req.body;

      if (!userName || !phone || !email || !date) {
        return res.status(400).json({ message: 'Не все поля заполнены' });
      }

      const newOrder = new Order({ userName, phone, email, date });

      newOrder.save();

      res.json({ message: 'Заявка отправлена' });
    } catch (e) {
      console.log(e);
      res.json({ message: 'Ошибка с отправкой заявки' });
    }
  }
}

module.exports = new OrderController();
