import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Branch from "@/models/Branch"
import { requireAuth } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const authResult = await requireAuth(["admin", "faculty"])(request)
    if ("error" in authResult) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.status })
    }

    await dbConnect()

    const { searchParams } = new URL(request.url)
    const batchId = searchParams.get("batchId")

    const query = { isActive: true }
    if (batchId) {
      query.batchId = batchId
    }

    const branches = await Branch.find(query).populate("batchId", "name startYear endYear")

    return NextResponse.json({ branches })
  } catch (error) {
    console.error("Get branches error:", error)
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

    const { name, code, batchId } = await request.json()

    if (!name || !code || !batchId) {
      return NextResponse.json({ error: "Name, code, and batch ID are required" }, { status: 400 })
    }

    const branch = await Branch.create({
      name,
      code,
      batchId,
    })

    return NextResponse.json({
      message: "Branch created successfully",
      branch,
    })
  } catch (error) {
    console.error("Create branch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
