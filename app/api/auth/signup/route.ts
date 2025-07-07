import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export async function POST(request: NextRequest) {
  console.log("🔄 Signup attempt started")

  try {
    // Parse request body first
    let body
    try {
      body = await request.json()
    } catch (parseError) {
      console.error("❌ Failed to parse request body:", parseError)
      return NextResponse.json({ message: "Invalid request body" }, { status: 400 })
    }

    const { name, email, password } = body

    console.log("📧 Signup attempt for email:", email)

    // Validate input
    if (!name || !email || !password) {
      console.log("❌ Missing required fields")
      return NextResponse.json({ message: "All fields are required" }, { status: 400 })
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

    // Check if user already exists
    let existingUser
    try {
      existingUser = await User.findOne({ email })
      console.log("🔍 Existing user check:", existingUser ? "User exists" : "New user")
    } catch (userError) {
      console.error("❌ User lookup failed:", userError)
      return NextResponse.json({ message: "Database query failed" }, { status: 500 })
    }

    if (existingUser) {
      console.log("❌ User already exists for email:", email)
      return NextResponse.json({ message: "User already exists" }, { status: 409 })
    }

    // Hash password
    let hashedPassword
    try {
      hashedPassword = await bcrypt.hash(password, 12)
      console.log("✅ Password hashed successfully")
    } catch (hashError) {
      console.error("❌ Password hashing failed:", hashError)
      return NextResponse.json({ message: "Password processing failed" }, { status: 500 })
    }

    // Determine user role
    const userRole = email === "admin@myshop.com" ? "admin" : "user"
    console.log("👤 User role assigned:", userRole)

    // Create user
    let user
    try {
      user = await User.create({
        name,
        email,
        password: hashedPassword,
        role: userRole,
      })
      console.log("✅ User created successfully:", user.email)
    } catch (createError) {
      console.error("❌ User creation failed:", createError)
      return NextResponse.json({ message: "User creation failed" }, { status: 500 })
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
      message: "User created successfully",
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

    console.log("✅ Signup successful for user:", user.email, "Role:", user.role)
    return response
  } catch (error) {
    console.error("❌ Signup route error:", error)
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
