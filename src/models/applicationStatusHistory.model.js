import mongoose, { Schema, Schmea } from "mongoose";

const applicationStatusHistorySchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  applicationId: {
    type: Schema.Types.ObjectId,
    ref: "Application",
  },
  fromStatus: String,
  toStatus: {
    type: String,
    required: true,
  },
  note: String,
  changedAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

applicationStatusHistorySchema.index({
  userId: 1,
  applicationId: 1,
  changedAt: 1,
});

export const ApplicationStatusHistory = mongoose.model(
  "ApplicationStatusHistory",
  applicationStatusHistorySchema,
);