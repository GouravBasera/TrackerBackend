import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { Note } from "../models/notes.model.js"

export const createNote = async (req, res) => {
    const {title, description, todo} = req.body;

    if(!title && !description){
        throw new ApiError(404, "Title and Description are missing")
    }

    const tempTodo = []

    const note = await Note.create({
        title, description, todo
    })

    if(!note){
        throw new ApiError(401, "Note Creation Failed")
    }

    res.status(201).json(
        new ApiResponse(200, note, "Note creation Successfull")
    )
}

export const updateNote = async (req, res) => {
    const { noteId, title, description } = req.body;

    if(!noteId){
        throw new ApiError(400, "No Parameters Passed")
    }

    const note = Note.findOne({
        _id: noteId
    })

    if(!note){
        throw new ApiError(404, "No note found with given id")
    }

    const hasChanges = (title == undefined && title == note.title) || (description == undefined && description == note.description)

    if(!hasChanges){
        throw new ApiError(404, "Invalid Changes")
    }

    note.title = title;
    note.description = description;

    await note.save()

    return res.send(201, note, "Note Updated")
}

export const getNoteById = async (req, res) => {
    const noteId = req.body()

    const note = await Note.findOne({_id: noteId})

    if(!note){
        throw new ApiError(404, "No Note Found")
    }

    res.status(201).json(
        new ApiResponse(200, note, "Note Found")
    )
}

export const getNotes = async (req, res) => {
    const userId = req.user._id;
}