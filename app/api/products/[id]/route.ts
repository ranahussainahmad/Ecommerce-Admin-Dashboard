import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { Product } from "@/lib/models/product"
import { verifyToken } from "@/lib/auth"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Connect to database only when needed
    try {
      await connectDB()
    } catch (dbError) {
      console.error("Database connection failed:", dbError)
      return NextResponse.json({ message: "Database connection failed" }, { status: 500 })
    }

    const product = await Product.findById(params.id)
    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 })
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error("Get product error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await verifyToken(request)
    if (!user || user.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    // Connect to database only when needed
    try {
      await connectDB()
    } catch (dbError) {
      console.error("Database connection failed:", dbError)
      return NextResponse.json({ message: "Database connection failed" }, { status: 500 })
    }

    const updateData = await request.json()

    const product = await Product.findByIdAndUpdate(params.id, updateData, { new: true })

    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 })
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error("Update product error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await verifyToken(request)
    if (!user || user.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    // Connect to database only when needed
    try {
      await connectDB()
    } catch (dbError) {
      console.error("Database connection failed:", dbError)
      return NextResponse.json({ message: "Database connection failed" }, { status: 500 })
    }

    const product = await Product.findByIdAndDelete(params.id)
    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Product deleted successfully" })
  } catch (error) {
    console.error("Delete product error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
