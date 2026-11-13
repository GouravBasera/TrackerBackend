import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { User } from "./user.model.js";
import bcrypt from "bcryptjs";

export const getCurrentUser = async (req, res) => {
  const safeUser = {
    _id: req.user._id,
    fullName: req.user.fullName,
    email: req.user.email,
    createdAt: req.user.createdAt,
    updatedAt: req.user.updatedAt,
  };

  return res
    .status(200)
    .json(new ApiResponse(200, safeUser, "User Profile Fetched"));
};

export const updateCurrentUser = async (req, res) => {
  const { fullName, email } = req.body;

  const normalizedEmail = email?.toLowerCase().trim();

  if (normalizedEmail !== undefined) {
    const existingEmail = await User.findOne({
      email: normalizedEmail,
      _id: { $ne: req.user._id },
    });

    if (existingEmail) {
      throw new ApiError(409, "Email already in use");
    }
  }

  if (fullName != undefined) {
    req.user.fullName = fullName;
  }

  if (normalizedEmail !== undefined) {
    req.user.email = normalizedEmail;
  }

  const hasChanges =
    (fullName !== undefined && fullName !== req.user.fullName) ||
    (normalizedEmail !== undefined && normalizedEmail !== req.user.email);

  if (!hasChanges) {
    throw new ApiError(400, "No profile changes detected");
  }

  await req.user.save();

  const safeUser = {
    _id: req.user._id,
    fullName: req.user.fullName,
    email: req.user.email,
    createdAt: req.user.createdAt,
    updatedAt: req.user.updatedAt,
  };

  return res
    .status(200)
    .json(new ApiResponse(200, safeUser, "User Profile Updated"));
};

export const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  const user = await User.findById(req.user._id).select("+password");
  const isPassewordValid = await bcrypt.compare(currentPassword, user.password);

  if (!isPassewordValid) {
    throw new ApiError(401, "Current password is incorrect");
  }

  user.password = await bcrypt.hash(newPassword, 10);

  user.tokenVersion++;

  await user.save();

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Password Change Successfull"));
};
