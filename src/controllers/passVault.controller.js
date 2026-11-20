import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { randomInt } from "crypto";
import { PassVault } from "../models/passVault.model.js"
import { encryptPassword, decryptPassword } from "../utils/encrypt.js";

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

export const saveEncryptedPassword = async (req, res) => {
  const { platformName, username, email, password } = req.body;

  if (!platformName || (!username && !email)) {
    throw new ApiError(
      400,
      "Platform name and at least one user identifier are required",
    );
  }

  if (!password) {
    throw new ApiError(409, "Password field is required");
  }

  const encryptedPassword = await encryptPassword(password)

  const savedPassword = await PassVault.create({
    platformName, username, email, encryptedPassword, owner: req.user._id
  })

  const responseData = {
    _id: savedPassword._id,
    platformName: savedPassword.platformName,
    username: savedPassword.username,
    email: savedPassword.email,
    createdAt: savedPassword.createdAt
  }

  return res.status(201).json(
    new ApiResponse(201, responseData, "Password Saved Successfully")
  )
};

export const getPassword = async (req, res) => {

  const { platformName, username, email } = req.body;

  if (!platformName && !username && !email) {
    throw new ApiError(400, "Search criteria is not defined");
  }

  const searchCriteria = [];

  if (platformName) {
    searchCriteria.push({ platformName });
  }

  if (username) {
    searchCriteria.push({ username });
  }

  if (email) {
    searchCriteria.push({ email });
  }

  const savedPasswords = await PassVault.find({
    owner: req.user._id,
    $or: searchCriteria
  }).select("-encryptedPassword");

  if(savedPasswords.length <= 0){
    throw new ApiError(404, "No Passwords Found")
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      savedPasswords,
      "Passwords Retrieved Successfully"
    )
  );
};