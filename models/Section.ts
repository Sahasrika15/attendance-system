import mongoose from "mongoose"

export interface ISection extends mongoose.Document {
  name: string
  batchId: mongoose.Types.ObjectId
  branchId: mongoose.Types.ObjectId
  year: number
  semester: number
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

const SectionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a section name"],
      uppercase: true,
    },
    batchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Batch",
      required: [true, "Please provide a batch ID"],
    },
    branchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: [true, "Please provide a branch ID"],
    },
    year: {
      type: Number,
      required: [true, "Please provide year"],
      min: 1,
      max: 4,
    },
    semester: {
      type: Number,
      required: [true, "Please provide semester"],
      min: 1,
      max: 2,
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

SectionSchema.index({ name: 1, batchId: 1, branchId: 1, year: 1, semester: 1 }, { unique: true })

export default mongoose.models.Section || mongoose.model<ISection>("Section", SectionSchema)
