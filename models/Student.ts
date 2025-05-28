import mongoose from "mongoose"

export interface IStudent extends mongoose.Document {
  name: string
  rollNo: string
  email: string
  sectionId: mongoose.Types.ObjectId
  userId?: mongoose.Types.ObjectId
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

const StudentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide student name"],
    },
    rollNo: {
      type: String,
      required: [true, "Please provide roll number"],
      unique: true,
      uppercase: true,
    },
    email: {
      type: String,
      required: [true, "Please provide email"],
      unique: true,
      lowercase: true,
    },
    sectionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Section",
      required: [true, "Please provide section ID"],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.Student || mongoose.model<IStudent>("Student", StudentSchema)
