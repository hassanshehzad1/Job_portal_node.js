import mongoose from "mongoose";

const JobSchema = mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "name is required"],
    },
    position: {
      type: String,
      required: [true, "Job position in company"],
      maxLength: 110,
    },
    status: {
      type: String,
      enum: ["pending", "accept", "interview", "reject"],
      default: "pending",
    },
    workType: {
      type: String,
      enum: ["part-time", "full-time", "internship", "contract", "remote"],
      default: "Internship",
    },
    workLocation: {
      type: String,
      default: "USA",
      required: [true, "Work location is required"],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("job", JobSchema);
