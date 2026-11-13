import { ApiError } from "../utils/ApiError.js";

const errorMiddleware = (err, req, res, next) => {
  let error = err;

  if (error.code === 11000) {
    error = new ApiError(409, "Duplicate resource");
  }
  if (!(error instanceof ApiError)) {
    error = new ApiError(
      error.statusCode || 500,
      error.statusCode ? error.message : "Internal Server Error",
    );
  }

  const statusCode = error.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: error.message,
    errors: error.errors,
    data: null,
  });
};

export default errorMiddleware;
