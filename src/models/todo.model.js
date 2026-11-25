import mongoose, { Schema } from "mongoose";

const todoSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    status: Enumerator(['Not Started', 'In Progress', 'Completed']),
})

export const Todo = mongoose.model("Todo", todoSchema)