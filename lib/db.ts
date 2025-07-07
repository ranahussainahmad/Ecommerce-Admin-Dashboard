import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI || process.env.MONGODB_URL

// Global variable to cache the connection
declare global {
  var _mongoose: any
}

let cached = global._mongoose

if (!cached) {
  cached = global._mongoose = { conn: null, promise: null }
}

export async function connectDB() {
  // Only check for MONGODB_URI when actually connecting, not during build
  if (!MONGODB_URI) {
    console.error("❌ Missing MONGODB_URI environment variable")
    console.error(
      "Available env vars:",
      Object.keys(process.env).filter((key) => key.includes("MONGO")),
    )

    throw new Error("MONGODB_URI environment variable is not defined. Please set it in your deployment platform.")
  }

  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    }

    console.log("🔄 Attempting to connect to MongoDB...")

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongoose) => {
        console.log("✅ MongoDB connected successfully")
        return mongoose
      })
      .catch((error) => {
        console.error("❌ MongoDB connection failed:", error.message)
        cached.promise = null
        throw error
      })
  }

  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    console.error("❌ Database connection error:", e)
    throw e
  }

  return cached.conn
}
