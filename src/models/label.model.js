import mongoose from "mongoose";

const labelSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 10,
    trim: true,
  },
  textColor: {
    type: String,
    default: "#000",
  },
  backgroundColor: {
    type: String,
    default: "#ffffff20",
  },
});

export const Label = mongoose.model("Label", labelSchema);
