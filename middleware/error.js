const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  if (err.name === "CastError") {
    const message = "Resource not found!";
    error = new ErrorResponse(message, 404);
  }
  if (err.code === 11000) {
    const message = "Duplicate value entered";
    error = new ErrorResponse(message, 401);
  }
  if (err.name === "ValidationError") {
    const message = Object.keys(err.errors).map((val) => "" + val.message);
    error = new ErrorResponse(message, 401);
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal Server Error!",
    });
  }

  // next();
};

module.exports = errorHandler;
