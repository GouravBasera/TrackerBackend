import mongoose, { Schema } from mongoose;

const resumeSchema = new Schema({
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    fileName: {
        type: String,
        required: true
    },
    storagePath: {
        type: String,
        required: true
    },
    rawText: {
        type: String,
        required: true
    },
    parseData: {
        type: {
            summary: {
                type: String
            },
            skills: [String],
            experience: [{
                company: String,
                role: String,
                startDate: String,
                endDate: String,
                highlights: [String]
            }],
            education: [{
                degree: String,
                institution: String,
                year: String
            }]
        }
    },
    isPrimary: {
        type: Boolean,
        default: false
    },
    isArchived: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

resumeSchema.index({ userId: 1, isArchived: 1, createdAt: -1 })
resumeSchema.index({ userId: 1 }, 
    { 
    unique: true,
    partialFilterExpression: {
      isPrimary: true,
      isArchived: false,
    },
  }
);

export const Resume = mongoose.model("Resume", resumeSchema)