import { User } from "../users/user.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import bcrypt from "bcryptjs"

const registerUser = async (req, res) => {
  const { fullName, email, password } = req.body;
  const normalizedEmail = email.toLowerCase().trim();

  const user = await User.findOne({ email: normalizedEmail });

  if (user) {
    throw new ApiError(409, "User already exist");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const createdUser = await User.create({fullName, email: normalizedEmail, password: hashedPassword})

  if(!createdUser){
    throw new ApiError(500, "User Creation Failed")
  }

  const safeUser = {
    _id: createdUser._id,
    fullName: createdUser.fullName,
    email: createdUser.email,
    createdAt: createdUser.createdAt,
    updatedAt: createdUser.updatedAt,
  }

  return res.status(201).json(new ApiResponse(201, safeUser, "User Creation Successfull"))
};