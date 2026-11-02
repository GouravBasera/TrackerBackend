
import { ApiError } from "../utils/ApiError.js";

const errorMiddleware = (err, req, res, next) => {
  let error = err;

  if (!(error instanceof ApiError)) {
    error = new ApiError(
      error.statusCode || 500,
      error.message || "Internal Server Error",
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