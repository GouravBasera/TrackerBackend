import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { randomInt } from "crypto";
import bcrypt from "bcryptjs";
import { User } from "../models/user.model.js";

export const generatePassword = async (req, res) => {
  const { passwordLength, isCharRequired, isNumberRequired } = req.body;

  const passwordString = "qQwWeErRtTyYuUiIoOpPaAsSdDfFgGhHjJkKlLzZxXcCvVbBnNmM";

  const allowedCharString = "`!@#$%^&*()_-";
  const numberString = "1234567890";

  if (
    !Number.isInteger(passwordLength) ||
    passwordLength <= 0 ||
    passwordLength > 128
  ) {
    throw new ApiError(400, "Valid Password Length is Required");
  }

  const requiredCharacters = [];

  let availableCharacters = passwordString;

  if (isCharRequired) {
    availableCharacters += allowedCharString;
    requiredCharacters.push(
      allowedCharString.charAt(randomInt(allowedCharString.length)),
    );
  }

  if (isNumberRequired) {
    availableCharacters += numberString;
    requiredCharacters.push(
      numberString.charAt(randomInt(numberString.length)),
    );
  }

  if (passwordLength < requiredCharacters.length) {
    throw new ApiError(400, "Password Length is too short");
  }

  let password = [...requiredCharacters];

  for (let i = password.length; i < passwordLength; i++) {
    password.push(
      availableCharacters.charAt(randomInt(availableCharacters.length)),
    );
  }

  for (let i = password.length - 1; i > 0; i--) {
    const j = randomInt(i + 1);
    [password[i], password[j]] = [password[j], password[i]];
  }

  password = password.join("");

  return res
    .status(200)
    .json(new ApiResponse(200, password, "Password Generated Successfully"));
};

export const savePassword = async (req, res) => {
    const { platformName, username, email, password } = req.body;

    if(!platformName && (!username || !email)){
        throw new ApiError(409, "Platform name and user id is required")
    }

    if(!password){
        throw new ApiError(409, "Password field is required")
    }

    const hashedPassword = bcrypt.hash(password, 10);
}