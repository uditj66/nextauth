import mongoose from "mongoose";
import { unique } from "next/dist/build/utils";
import { type } from "os";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please Provide a UserName"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please Provide an E-mail"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please Provide a Password"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
  },
  verifyToken: String,
  verifyTokenExpiry: Date,
  ForgotPasswordToken: String,
  ForgotPasswordTokenExpiry: Date,
});

const User=  mongoose.models.users || mongoose.model("users",userSchema);
export default User;
