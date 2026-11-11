import { ApiResponse } from "../../utils/ApiResponse.js"

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