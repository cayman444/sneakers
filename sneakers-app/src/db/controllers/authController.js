const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

class AuthController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Ошибка при регистрации', errors });
      }
      const { username, email, password } = req.body;
      const candidate = await User.findOne({ email });
      if (candidate) {
        return res.status(400).json({ message: 'Пользователь с такой почтой уже существует' });
      }
      const hashPassword = bcrypt.hashSync(password, 5);
      const user = new User({ username, email, password: hashPassword });
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '30d' });

      user.save();
      res.json({ username, token, message: 'Пользователь создан' });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Ошибка при регистрации' });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: `Пользователь не найден` });
      }

      const userName = user.username;

      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: `Пароль не совпадает` });
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '30d' });
      res.json({ userName, token, message: 'Вход выполнен успешно' });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Ошибка при входе' });
    }
  }

  async getUser(req, res) {
    try {
      const user = await User.findById(req.userId);

      if (!user) {
        return res.status(400).json({ message: `Ошибка с получением пользователя` });
      }

      const { username, email } = user;

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '30d' });
      res.json({ username, email, token, message: 'Пользователь найден' });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Ошибка с получением пользователя' });
    }
  }

  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json({ users, message: 'Пользователи найдены' });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Ошибка с получением пользователей' });
    }
  }

  async updateCountProducts(req, res) {
    try {
      const user = await User.findById(req.userId);
      const newProduct = req.body;

      if (!user) {
        return res.status(400).json({ message: `Ошибка с получением пользователя` });
      }

      await User.updateOne({ _id: user._id }, { $set: { productInCart: newProduct } });

      res.status(200).json({ message: 'Товар успешно добавлен в корзину' });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Ошибка с добавлением товара' });
    }
  }

  async getCountProducts(req, res) {
    try {
      const user = await User.findById(req.userId);

      if (!user) {
        return res.status(400).json({ message: `Ошибка с получением пользователя` });
      }

      res.status(200).json({ productInCart: user.productInCart, message: 'Товары найдены' });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Ошибка с получением товаров' });
    }
  }
}

module.exports = new AuthController();
