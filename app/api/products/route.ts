import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { Product } from "@/lib/models/product"
import { verifyToken } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    // Connect to database only when needed
    try {
      await connectDB()
    } catch (dbError) {
      console.error("Database connection failed:", dbError)
      return NextResponse.json({ message: "Database connection failed" }, { status: 500 })
    }

    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search")
    const category = searchParams.get("category")
    const limit = searchParams.get("limit")

    const query: any = {}

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ]
    }

    if (category) {
      query.category = { $regex: category, $options: "i" }
    }

    let productsQuery = Product.find(query).sort({ createdAt: -1 })

    if (limit) {
      productsQuery = productsQuery.limit(Number.parseInt(limit))
    }

    const products = await productsQuery

    return NextResponse.json(products)
  } catch (error) {
    console.error("Get products error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
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

    const { name, description, price, category, stock, imageUrl } = await request.json()

    if (!name || !description || !price || !category || !stock || !imageUrl) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 })
    }

    const product = await Product.create({
      name,
      description,
      price,
      category,
      stock,
      imageUrl,
    })

    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    console.error("Create product error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
