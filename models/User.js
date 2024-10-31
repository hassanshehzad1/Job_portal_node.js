import mongoose from "mongoose";
import validator from "validator";

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email must be required "],
      validate: validator.isEmail,
      unique: true,
    },
    username: {
      type: String,
      unique: [true, "Username is already exist"],
      required: [true, "Username must be required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    age: {
      type: Number,
      required: [true, "Please enter your age"],
    },
    location: {
      type: String,
      default: "US",
    },
  },
  { timestamps: true }
);

export default mongoose.model("user", UserSchema);
