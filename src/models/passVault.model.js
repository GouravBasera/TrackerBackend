import mongoose, { Schema} from "mongoose";

const passVaultSchema = new Schema({
    password: {
        type: String,
        required: true
    },
    platformName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true
    },
    username: {
        type: String,
        trim: true
    }
})

export const PassVault = mongoose.model("PassVault", passVaultSchema)