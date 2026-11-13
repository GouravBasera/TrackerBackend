import jwt from "jsonwebtoken"
import { ApiError } from "../utils/ApiError.js"
import { User } from "../modules/users/user.model.js";

export const verifyJWT = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader){
        throw new ApiError(401, "Unauthorized Request")
    }

    const token = authHeader.split(" ")[1];
    
    if(!token){
        throw new ApiError(401, "Unauthorized Request")
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

    const user = await User.findById(decodedToken._id);

    if(!user){
        throw new ApiError(401, "Invalid Access Token")
    }

    if(decodedToken.tokenVersion !== user.tokenVersion){
        throw new ApiError(401, "Invalid Access Token")
    }

    req.user = user;

    next()
}