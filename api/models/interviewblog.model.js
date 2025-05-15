import mongoose from "mongoose";
const { Schema } = mongoose;

const interviewSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    companyId: {
      type: String, // Store company as a string
      required: true,
    },
    roleId: {
      type: String, // Store role as a string
      required: true,
    },
    interviewDate: {
      type: Date,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    difficultyLevel: {
      type: String,
      enum: ["easy", "medium", "hard"],
      required: true,
    },
    tags: [
      {
        type: String, // Store tags as strings if no Tag model is available
      },
    ],
    author: {
      type: Schema.Types.ObjectId,
      ref: "User", // Still linking the interview to a User model
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const Interview = mongoose.model("Interview", interviewSchema);
export default Interview;
