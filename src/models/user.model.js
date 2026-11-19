import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    tokenVersion: {
        type: Number,
        default: 0
    },
    passVaultPasswords: {
        passVault: [{
            type: Schema.Types.ObjectId,
            ref: 'PassVault'
        }]
    }
}, {timestamps: true})

export const User = mongoose.model("User", userSchema)