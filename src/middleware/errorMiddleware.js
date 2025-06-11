const errorHandler = (err, req, res, next) => {
  const statusCode = err.status && Number.isInteger(err.status) ? err.status : 500;

  res.status(statusCode).json({
    success: false,
    status: statusCode,
    message: err.message || "Something went wrong",
    errors: err.messages || [],
    stack: process.env.NODE_ENV === "development" ? err.stack : {},
  });
};

module.exports = errorHandler;
