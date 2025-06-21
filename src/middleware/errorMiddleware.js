const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;

  const details = err.details || err.errors || err.messages || [];

  if (status === 500) console.error(err.stack);

  res.status(status).json({
    success: false,
    message: err.message || "Internal Server Error",
    details,
  });
};

module.exports = errorHandler;
