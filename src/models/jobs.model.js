import mongoose, { Schema } from "mongoose";

const jobSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    sourceType: {
      type: [String],
      enum: [
        "MANUAL_PASTE",
        "LINKEDIN_URL",
        "INDEED_URL",
        "NAUKRI_URL",
        "WELLFOUND_URL",
        "COMPANY_ATS",
        "URL_IMPORT",
      ],
    },
    sourceUrl: {
      type: String,
      trim: true,
    },
    companyName: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    workMode: {
      type: String,
      enum: ["REMOTE", "HYBRID", "ONSITE", "UNKNOWN"],
      default: "UNKNOWN",
    },
    salaryRange: {
      type: String,
      trim: true,
    },
    rawDescription: {
      type: String,
      required: true,
    },
    parsedRequirements: {
      type: {
        requiredSkills: [String],
        preferredSkills: [String],
        minYearsExperience: Number,
        educationRequirement: String,
        keyResponsibilities: [String],
      },
    },
    status: {
      type: String,
      enum: ["NEW", "ANALYZED", "ARCHIVED"],
      default: "NEW",
    },
  },
  { timestamps: true },
);

jobSchema.index({
  userId: 1,
  status: 1,
  createdAt: -1,
});

jobSchema.index({
  title: "text",
  companyName: "text",
  rawDescription: "text",
});

export const Job = mongoose.model("Job", jobSchema);
