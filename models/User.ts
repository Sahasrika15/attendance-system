import mongoose from "mongoose"

export interface IUser extends mongoose.Document {
  email: string
  password: string
  name: string
  role: "admin" | "faculty" | "student"
  createdAt: Date
  updatedAt: Date
}

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: 6,
    },
    name: {
      type: String,
      required: [true, "Please provide a name"],
    },
    role: {
      type: String,
      enum: ["admin", "faculty", "student"],
      default: "student",
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema)
