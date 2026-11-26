import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { Todo } from "../models/todo.model.js"

export const createTodo = async (req, res) => {
    const {title} = req.body

    if(!title){
        throw new ApiError(401, "Title is required")
    }

    const todo = Todo.create({
        title, status: "Not Started"
    })

    if(!todo){
        throw new ApiError(400, "Error Creating Todo")
    }

    return res.status(200).json(
        new ApiResponse(200, "Todo Created Successfully")
    )
}

export const getTodo = async (req, res) => {
    const todoId = req.body;

    const todo = await Todo.findOne({_id: todoId})

    if(!todo){
        throw new ApiError(404, "No Todo Found")
    }

    return res.status().json(
        new ApiResponse(200, todo, "Todo Found")
    )
}

export const updateTodo = async (req, res) => {
    const {todoId, title, status} = req.body;

    if(!todoId){
        throw new ApiError(401, "Todo Id is required to find Todo")
    }

    const todo = await Todo.findOne({_id: todoId})

    if(!todo){
        throw new ApiError(404, "No todo found")
    }

    const hasChanges = todo.title != title || todo.status != status

    if(hasChanges){
        todo.title = title;
        todo.status = status;
    }

    await todo.save()

    return res.status(200).json(
        new ApiResponse(200, todo, "Todo Saved")
    )
}

export const deleteTodo = async (req, res) => {
    const {todoId} = req.body

    if(!todoId){
        throw new ApiError(404, "Todo Id is required")
    }

    const todo = await Todo.findOne({_id: todoId})

    if(!todo){
        throw new ApiError(404, "No Todo Found")
    }

    await Todo.findByIdAndDelete({_id: todoId})

    return res.status(200).json(
        new ApiResponse(200, "Todo Deleted Successfully")
    )
}