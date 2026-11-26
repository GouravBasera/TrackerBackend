import mongoose, { Schema } from "mongoose";

const jobMatchesSchema = new Schema({
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    jobId: {
      type: Schema.Types.ObjectId,
      ref: "Job",
    },
    resumeId: {
      type: Schema.Types.ObjectId,
      ref: "Resume",
    },
    overallScore: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    componentScores: {
        skills: Number,
        experience: Number,
        responsibilities: Number,
        education: Number,
        preferences: Number
    },
    weightsUsed: {
        skills: Number,
        experience: Number,
        responsibilities: Number,
        education: Number,
        preferences: Number
    },
    matchedSkills: {
        typpe: [String],
        default: []
    },
    missingSkills: {
        typpe: [String],
        default: []
    },
    experienceAnalysis: String,
    potentialConcerns: {
        type: [String],
        default: []
    },
    recommendations: {
        type: [String],
        default: []
    },
    aiModel: String,
}, { timestamps: true })

jobMatchesSchema.index({
    userId: 1,
    jobId: 1,
    resumeId: 1
})

jobMatchesSchema.index({
    userId: 1,
    overallScore: -1
})

export const JobMatch = mongoose.model("JobMatch", jobMatchesSchema)