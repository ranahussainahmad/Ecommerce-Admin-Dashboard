import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export async function POST(request: NextRequest) {
  console.log("🔄 Login attempt started")

  try {
    // Parse request body first
    let body
    try {
      body = await request.json()
    } catch (parseError) {
      console.error("❌ Failed to parse request body:", parseError)
      return NextResponse.json({ message: "Invalid request body" }, { status: 400 })
    }

    const { email, password } = body

    console.log("📧 Login attempt for email:", email)

    // Validate input
    if (!email || !password) {
      console.log("❌ Missing email or password")
      return NextResponse.json({ message: "Email and password are required" }, { status: 400 })
    }

    // Check environment variables
    const JWT_SECRET = process.env.JWT_SECRET
    const MONGODB_URI = process.env.MONGODB_URI || process.env.MONGODB_URL

    if (!JWT_SECRET) {
      console.error("❌ Missing JWT_SECRET environment variable")
      return NextResponse.json({ message: "Server configuration error - JWT_SECRET missing" }, { status: 500 })
    }

    if (!MONGODB_URI) {
      console.error("❌ Missing MONGODB_URI environment variable")
      return NextResponse.json({ message: "Server configuration error - Database URI missing" }, { status: 500 })
    }

    console.log("✅ Environment variables check passed")

    // Dynamic import to avoid build-time issues
    const mongoose = await import("mongoose")

    // Connect to database
    try {
      if (mongoose.default.connection.readyState !== 1) {
        console.log("🔄 Connecting to MongoDB...")
        await mongoose.default.connect(MONGODB_URI, {
          bufferCommands: false,
        })
        console.log("✅ MongoDB connected successfully")
      } else {
        console.log("✅ Using existing MongoDB connection")
      }
    } catch (dbError) {
      console.error("❌ Database connection failed:", dbError)
      return NextResponse.json({ message: "Database connection failed" }, { status: 500 })
    }

    // Import User model dynamically
    let User
    try {
      const userModel = await import("@/lib/models/user")
      User = userModel.User
    } catch (modelError) {
      console.error("❌ Failed to import User model:", modelError)
      return NextResponse.json({ message: "Server error - User model" }, { status: 500 })
    }

    // Find user
    let user
    try {
      user = await User.findOne({ email })
      console.log("🔍 User lookup result:", user ? "Found" : "Not found")
    } catch (userError) {
      console.error("❌ User lookup failed:", userError)
      return NextResponse.json({ message: "Database query failed" }, { status: 500 })
    }

    if (!user) {
      console.log("❌ User not found for email:", email)
      return NextResponse.json({ message: "Invalid email or password" }, { status: 401 })
    }

    // Verify password
    let isPasswordValid
    try {
      isPasswordValid = await bcrypt.compare(password, user.password)
      console.log("🔐 Password verification:", isPasswordValid ? "Success" : "Failed")
    } catch (bcryptError) {
      console.error("❌ Password verification failed:", bcryptError)
      return NextResponse.json({ message: "Authentication error" }, { status: 500 })
    }

    if (!isPasswordValid) {
      console.log("❌ Invalid password for email:", email)
      return NextResponse.json({ message: "Invalid email or password" }, { status: 401 })
    }

    // Generate JWT token
    let token
    try {
      token = jwt.sign(
        {
          userId: user._id,
          email: user.email,
          role: user.role,
        },
        JWT_SECRET,
        { expiresIn: "7d" },
      )
      console.log("✅ JWT token generated successfully")
    } catch (jwtError) {
      console.error("❌ JWT token generation failed:", jwtError)
      return NextResponse.json({ message: "Token generation failed" }, { status: 500 })
    }

    // Create response
    const responseData = {
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    }

    const response = NextResponse.json(responseData)

    // Set cookie
    try {
      response.cookies.set("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60, // 7 days
        path: "/",
      })
      console.log("✅ Cookie set successfully")
    } catch (cookieError) {
      console.error("❌ Cookie setting failed:", cookieError)
      // Continue anyway, token is in response
    }

    console.log("✅ Login successful for user:", user.email, "Role:", user.role)
    return response
  } catch (error) {
    console.error("❌ Login route error:", error)
    console.error("Error stack:", error.stack)
    return NextResponse.json(
      {
        message: "Internal server error",
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 },
    )
  }
}
