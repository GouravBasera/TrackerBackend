import { JobUser } from "../models/jobUserProfile.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const registerJobProfile = async (req, res) => {
  const existingProfile = await JobUser.findOne({ userId: req.user._id });

  if (existingProfile) {
    throw new ApiError(400, "Profile Already Exists");
  }

  const {
    headline,
    yearsOfExperience,
    targetRoles,
    prefferedLocations,
    remotePreference,
    minExpectedSalary,
    currency,
    scoringWeights,
  } = req.body;

  const jobUser = await JobUser.create({
    userId: req.user._id,
    headline,
    yearsOfExperience,
    targetRoles,
    prefferedLocations,
    remotePreference,
    minExpectedSalary,
    currency,
    scoringWeights,
  });

  if(!jobUser){
    throw new ApiError(400, "Error Creating User Profile")
  }

  res.status(201).json(
    new ApiResponse(200, jobUser, "User Created Successfully")
  )
};
