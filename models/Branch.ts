import mongoose from "mongoose"

export interface IBranch extends mongoose.Document {
  name: string
  code: string
  batchId: mongoose.Types.ObjectId
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

const BranchSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a branch name"],
    },
    code: {
      type: String,
      required: [true, "Please provide a branch code"],
      uppercase: true,
    },
    batchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Batch",
      required: [true, "Please provide a batch ID"],
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

BranchSchema.index({ name: 1, batchId: 1 }, { unique: true })

export default mongoose.models.Branch || mongoose.model<IBranch>("Branch", BranchSchema)
