import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../modules/users/user.model.js";

export const verifyJWT = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new ApiError(401, "Unauthorized Request");
  }

  const bearerMatch = authHeader.match(/^Bearer\s+(\S+)$/i);

  if (!bearerMatch) {
    throw new ApiError(401, "Invalid Authorization Header");
  }

  const token = bearerMatch[1];

  if (!token) {
    throw new ApiError(401, "Unauthorized Request");
  }

  let decodedToken;

  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    if (
      error.name === "TokenExpiredError" ||
      error.name === "JsonWebTokenError" ||
      error.name === "NotBeforeError"
    ) {
      throw new ApiError(401, "Invalid or expired Access Token");
    }

    throw error;
  }
  const user = await User.findById(decodedToken._id);

  if (!user) {
    throw new ApiError(401, "Invalid Access Token");
  }

  if (decodedToken.tokenVersion !== user.tokenVersion) {
    throw new ApiError(401, "Invalid Access Token");
  }

  req.user = user;

  next();
};
