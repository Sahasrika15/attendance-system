import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Batch from "@/models/Batch"
import { requireAuth } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const authResult = await requireAuth(["admin", "faculty"])(request)
    if ("error" in authResult) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.status })
    }

    await dbConnect()
    const batches = await Batch.find({ isActive: true }).sort({ startYear: -1 })

    return NextResponse.json({ batches })
  } catch (error) {
    console.error("Get batches error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const authResult = await requireAuth(["admin"])(request)
    if ("error" in authResult) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.status })
    }

    await dbConnect()

    const { name, startYear, endYear } = await request.json()

    if (!name || !startYear || !endYear) {
      return NextResponse.json({ error: "Name, start year, and end year are required" }, { status: 400 })
    }

    const batch = await Batch.create({
      name,
      startYear,
      endYear,
    })

    return NextResponse.json({
      message: "Batch created successfully",
      batch,
    })
  } catch (error) {
    console.error("Create batch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
