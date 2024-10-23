import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Plase provide username"],
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: [true, "Plase provide email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Plase provide password"],
  },
  phone: {
    type: String,
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  // role: {
  //   type: String,
  //   required: [true, "Plase provide role"],
  // },
  forgetPasswordToken: String,
  forgetPasswordTokenExpery: Date,
  verifyToken: String,
  verifyTokenExpery: Date
})

const User = mongoose.models.users || mongoose.model("users", UserSchema)

export default User