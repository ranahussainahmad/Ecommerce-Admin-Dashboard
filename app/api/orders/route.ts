import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { Order } from "@/lib/models/order"
import { verifyToken } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const user = await verifyToken(request)
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    await connectDB()

    let orders
    if (user.role === "admin") {
      orders = await Order.find().populate("items.product").sort({ createdAt: -1 })
    } else {
      orders = await Order.find({ userId: user.userId }).populate("items.product").sort({ createdAt: -1 })
    }

    return NextResponse.json(orders)
  } catch (error) {
    console.error("Get orders error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await verifyToken(request)
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    await connectDB()

    const { items, total, shippingAddress } = await request.json()

    const order = await Order.create({
      userId: user.userId,
      items,
      total,
      shippingAddress,
      status: "pending",
    })

    return NextResponse.json(order, { status: 201 })
  } catch (error) {
    console.error("Create order error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
