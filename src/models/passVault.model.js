import mongoose, { Schema} from "mongoose";

const passVaultSchema = new Schema({
    encryptedPassword: {
        type: String,
        select: false,
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
    },
    owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
    }
}, {timestamps: true})

passVaultSchema.index({ owner: 1 });

export const PassVault = mongoose.model("PassVault", passVaultSchema)