import { validateRequest } from "express-validator"
import { ApiError } from "../utils/ApiError.js"

const validationRequest = (req, res, next) => {
    const errors = validateRequest(req)

    if(!errors.isEmpty()){
        return next(new ApiError(400, "Validation Failed", errors.array()))
    }

    next()
}

export {validationRequest}