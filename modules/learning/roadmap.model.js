import mongoose, { mongo, Schema } from "mongoose";

const roadMapSchema = new Schema(
  {
    title: {
      type: String,
      unique: true,
      trim: true,
    },
    description: String,
    percentCompleted: {
      type: Number,
      default: 0,
      required: true,
      max: [100, "You really think you completed more than 100%, think again"],
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    skills: {
      type: Schema.Types.ObjectId,
      ref: "Skills",
      required: true,
    },
  },
  { timestamps: true },
);

export const Roadmap = mongoose.model("RoadMap", roadMapSchema);
