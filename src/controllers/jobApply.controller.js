import { JobUser } from "../models/jobUserProfile.js"
import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"

export const registerJobProfile = async (req, res) => {
    const jobUser = await JobUser.findOne({userId: req.user._id})
}