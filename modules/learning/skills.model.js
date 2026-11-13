import mongoose, {Schema} from "mongoose";

const skillsSchema = new Schema({
    items: [{title: {
        type: String,
        unique: true,
        trim: true,
    }, 
    description: String,
    estimatedTime: {
        type: Number,
        required: true,
        default: 0
    },
    completedTime: {
        type: Number,
        required: true,
        default: 0
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    resources: {
        type: String
    }}]
})

export const Skill = mongoose.model("Skill", skillsSchema)