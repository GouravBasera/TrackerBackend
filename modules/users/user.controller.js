import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js"
import { User } from "./user.model.js";

export const getCurrentUser = async (req, res) => {
    const safeUser = {
        _id: req.user._id,
        fullName: req.user.fullName,
        email: req.user.email,
        createdAt: req.user.createdAt,
        updatedAt: req.user.updatedAt,
    }

    return res.status(200).json(
        new ApiResponse(200, safeUser, "User Profile Fetched")
    )
}

export const updateCurrentUser = async (req, res) => {
    const {fullName, email} = req.body

    const normalizedEmail = email?.toLowerCase().trim()

    if (normalizedEmail !== undefined) {
    const existingEmail = await User.findOne({
        email: normalizedEmail,
        _id: { $ne: req.user._id }
    });

    if (existingEmail) {
        throw new ApiError(409, "Email already in use");
    }
}

    if(fullName != undefined){
        req.user.fullName = fullName;
    }

    if (normalizedEmail !== undefined) {
        req.user.email = normalizedEmail;
    }

    await req.user.save();

    const safeUser = {
        _id: req.user._id,
        fullName: req.user.fullName,
        email: req.user.email,
        createdAt: req.createdAt,
        updatedAt: req.user.updatedAt
    }

    return res.status(200).json(
        new ApiResponse(200, safeUser, "User Profile Updated")
    )
}