const jwt = require('jsonwebtoken');
const { secret } = require('../config');

module.exports = function (roles) {
  return function (req, res, next) {
    if (req.method === 'OPTIONS') {
      next();
    }

    try {
      const token = req.headers.authorization.split(' ')[1];
      if (!token) {
        return res.status(400).json({ message: 'Пользователь не авторизован' });
      }
      const { roles: userRoles } = jwt.verify(token, secret);

      const hasRole = userRoles.some((role) => roles.includes(role));

      if (!hasRole) {
        return res.status(403).json({ message: 'Нет доступа' });
      }
      next();
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Пользователь не авторизован' });
    }
  };
};
