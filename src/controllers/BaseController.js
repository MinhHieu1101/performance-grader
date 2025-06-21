class BaseController {
  // wrap an async handler => catch errors and pass to next()
  static handle(fn) {
    return (req, res, next) => {
      Promise.resolve(fn(req, res, next)).catch(next);
    };
  }

  // common response formatting
  sendSuccess(res, payload, status = 200, message = null) {
    return res.status(status).json({ success: true, data: payload, message });
  }

  sendError(res, error) {
    const status = error.status || 500;
    const details = error.details || [];
    return res.status(status).json({
      success: false,
      message: error.message,
      details,
    });
  }
}

module.exports = BaseController;
