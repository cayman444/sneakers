const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(400).json({ message: 'Нет доступа' });
    }
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decodedData.id;
    next();
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: 'Нет доступа' });
  }
};
