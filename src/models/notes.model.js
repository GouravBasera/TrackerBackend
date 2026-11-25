import mongoose, { Schema } from "mongoose";

const notesSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    todo: {
      type: Schema.Types.ObjectId,
      ref: "Todo",
      default: [],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

export const Todo = mongoose.model("Todo", todoSchema);
