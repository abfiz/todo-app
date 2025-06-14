const User = require('../models/user');

// Protect routes
exports.requireLogin = async (req, res, next) => {
  if (!req.session.userId) {
    return res.redirect('/login');
  }

  try {
    const user = await User.findById(req.session.userId);
    if (!user) {
      return res.redirect('/login');
    }

    req.user = user; // attach user to req object
    next();
  } catch (err) {
    res.status(500).send('Session error');
  }
};
