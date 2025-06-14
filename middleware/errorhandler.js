// middleware/errorhandler.js

function errorHandler(err, req, res, next) {
  console.error('❌ Error Handler:', err.stack);
  res.status(500).send('Something broke!');
}

module.exports = errorHandler;


