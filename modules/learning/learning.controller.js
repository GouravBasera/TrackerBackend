import { ApiError } from "../../utils/ApiError.js"
import { ApiResponse } from "../../utils/ApiResponse.js"
import { Roadmap } from "./roadmap.model.js"

export const getAllRoadmaps = async (req, res) => {

    const roadmap = req.user.roadmaps;

    if(!roadmap){
        throw new ApiError("Error Fetching Roadmaps")
    }

    return res.status(200).json(
        new ApiResponse(200, roadmaps, "Roadmap fetched Successfully")
    )
}

export const getRoadmapById = async (req, res) => {
    const {roadmapId} = req.header

    const roadmap = await Roadmap.findOne({_id: roadmapId})

    if(!roadmap){
        throw new ApiError(404, "No roadmap found with given ID")
    }

    return res.status(200).json(
        new ApiResponse(200, roadmap, "Roadmap Found Successfully")
    )
}

export const createSkill = async (req, res) => {
    const { items } = req.body

    if(!items){
        throw new ApiError(401, "Skill creation failed")
    }

    return res.status(201).json(
        new ApiResponse(201, items, "Skill created successfully")
    )
}