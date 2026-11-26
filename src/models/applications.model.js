import mongoose, {Schema} from "mongoose";

const applicationsSchema = new Schema({
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
    resumeSnapshot: {
        type: {},
        required: true
    },
    resumeSnapshot: {
      type: Schema.Types.Mixed,
      required: true,
    },
    status: {
        type: String,
        enum: ['SAVED', 'READY', 'APPLIED', 'SCREENING', 'INTERVIEW', 'OFFER', 'REJECTED', 'WITHDRAWN'],
        default: 'SAVED'
    },
    appliedAt: Date,
    nextFollowUpAt: Date,
    notes: String,
}, {timestamps: true})

applicationsSchema.index({
    userId: 1,
    jobId: 1
})

applicationsSchema.index({
    userId: 1,
    status: 1,
    updatedAt: -1
})

applicationsSchema.index({
    userId: 1,
    nextFollowUpAt: 1
})

export const Application = mongoose.model("Application", applicationsSchema)