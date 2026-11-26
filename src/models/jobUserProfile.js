import mongoose, { Schema } from "mongoose";

const jobUserSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    headline: {
      type: String,
      required: true,
      trim: true,
    },
    yearsOfExperience: {
      type: Number,
      required: true,
      default: 0,
    },
    targetRoles: {
      type: [String],
      default: [],
    },
    prefferedLocations: {
      type: [String],
      default: [],
    },
    remotePreference: {
      type: String,
      enum: ["REMOTE", "HYBRID", "ONSITE", "ANY"],
      default: "ANY",
    },
    minExpectedSalary: {
      type: Number,
      min: 0,
      required: true,
    },
    currency: {
      type: String,
      default: "INR",
    },
    scoringWeights: {
      type: {
        skills: {
          type: Number,
          default: 35,
        },
        experience: {
          type: Number,
          default: 25,
        },
        responsibilities: {
          type: Number,
          default: 25,
        },
        education: {
          type: Number,
          default: 10,
        },
        preferences: {
          type: Number,
          default: 10,
        },
      },
    },
  },
  { timestamps: true },
);

export const JobUser = mongoose.model("JobUser", jobUserSchema);