import mongoose, { Schema } from "mongoose";

const applicationDocumentSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  applicationId: {
    type: Schema.Types.ObjectId,
    ref: "Application",
  },
  docType: {
    type: String,
    required: true,
    enum: ["COVER_LETTER", "SCREENING_ANSWER"],
  },
  questionText: {
    type: String,
    required: function () {
      return this.docType === "SCREENING_ANSWER";
    },
    trim: true,
  },
  generateText: {
    type: String,
    required: true
  }, 
  finalText: {
    type: String,
    required: true
  },
  version: {
    type: Number,
    default: 1
  }
}, { timestamps: true });

applicationDocumentSchema.index({userId: 1, applicationId: 1, docType: 1})

export const ApplicationDocument = mongoose.model(
  "ApplicationMDocument",
  applicationDocumentSchema,
);
