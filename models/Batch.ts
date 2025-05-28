import mongoose from "mongoose"

export interface IBatch extends mongoose.Document {
  name: string
  startYear: number
  endYear: number
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

const BatchSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a batch name"],
      unique: true,
    },
    startYear: {
      type: Number,
      required: [true, "Please provide start year"],
    },
    endYear: {
      type: Number,
      required: [true, "Please provide end year"],
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

export default mongoose.models.Batch || mongoose.model<IBatch>("Batch", BatchSchema)
