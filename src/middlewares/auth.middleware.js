const jwt = require('jsonwebtoken');
const { User } = require('../models/index');

const authenticateToken = async (req, res, next) => {
  try {
    //console.log("entro")
    const token = req.headers['token'];
    //console.log(req)
    // const token = authHeader && authHeader.split(' ')[1];

    // if (!token) {
    //   return res.status(401).json({ message: 'No token provided' });
    // }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //console.log(decoded)
    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }
    //console.log(user)

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    }
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = {
  authenticateToken
}; 