import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

export async function GET(request: NextRequest) {
  console.log("🔄 Auth check started")

  try {
    // Get token from cookies
    const token = request.cookies.get("token")?.value

    if (!token) {
      console.log("❌ No token found in cookies")
      return NextResponse.json({ message: "No token provided" }, { status: 401 })
    }

    // Check JWT_SECRET
    const JWT_SECRET = process.env.JWT_SECRET
    if (!JWT_SECRET) {
      console.error("❌ Missing JWT_SECRET environment variable")
      return NextResponse.json({ message: "Server configuration error" }, { status: 500 })
    }

    // Verify token
    let tokenData
    try {
      tokenData = jwt.verify(token, JWT_SECRET) as any
      console.log("✅ Token verified successfully for user:", tokenData.email)
    } catch (jwtError) {
      console.error("❌ Token verification failed:", jwtError)
      return NextResponse.json({ message: "Invalid token" }, { status: 401 })
    }

    // Check database connection
    const MONGODB_URI = process.env.MONGODB_URI || process.env.MONGODB_URL
    if (!MONGODB_URI) {
      console.error("❌ Missing MONGODB_URI environment variable")
      return NextResponse.json({ message: "Database configuration error" }, { status: 500 })
    }

    // Dynamic import and connect
    const mongoose = await import("mongoose")

    try {
      if (mongoose.default.connection.readyState !== 1) {
        console.log("🔄 Connecting to MongoDB...")
        await mongoose.default.connect(MONGODB_URI, {
          bufferCommands: false,
        })
        console.log("✅ MongoDB connected successfully")
      }
    } catch (dbError) {
      console.error("❌ Database connection failed:", dbError)
      return NextResponse.json({ message: "Database connection failed" }, { status: 500 })
    }

    // Import User model
    let User
    try {
      const userModel = await import("@/lib/models/user")
      User = userModel.User
    } catch (modelError) {
      console.error("❌ Failed to import User model:", modelError)
      return NextResponse.json({ message: "Server error" }, { status: 500 })
    }

    // Find user
    let user
    try {
      user = await User.findById(tokenData.userId).select("-password")
      console.log("🔍 User lookup result:", user ? "Found" : "Not found")
    } catch (userError) {
      console.error("❌ User lookup failed:", userError)
      return NextResponse.json({ message: "Database query failed" }, { status: 500 })
    }

    if (!user) {
      console.log("❌ User not found for ID:", tokenData.userId)
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    console.log("✅ Auth check successful for user:", user.email)
    return NextResponse.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error) {
    console.error("❌ Auth check error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
