// middleware/errorhandler.js

export default (err, req, res, next) => {
  console.error('🔴 Error:', err.stack || err.message);
  res.status(500).send('Something went wrong!');
};
