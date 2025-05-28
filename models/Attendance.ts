import mongoose from "mongoose"

export interface IAttendance extends mongoose.Document {
  studentId: mongoose.Types.ObjectId
  sectionId: mongoose.Types.ObjectId
  date: Date
  status: "present" | "absent"
  markedBy: mongoose.Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

const AttendanceSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: [true, "Please provide student ID"],
    },
    sectionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Section",
      required: [true, "Please provide section ID"],
    },
    date: {
      type: Date,
      required: [true, "Please provide date"],
    },
    status: {
      type: String,
      enum: ["present", "absent"],
      required: [true, "Please provide attendance status"],
    },
    markedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide who marked the attendance"],
    },
  },
  {
    timestamps: true,
  },
)

AttendanceSchema.index({ studentId: 1, date: 1 }, { unique: true })

export default mongoose.models.Attendance || mongoose.model<IAttendance>("Attendance", AttendanceSchema)
