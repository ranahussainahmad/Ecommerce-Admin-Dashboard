import { NextResponse } from "next/server"

export async function GET() {
  const envVars = {
    JWT_SECRET: process.env.JWT_SECRET ? "✅ Set" : "❌ Missing",
    MONGODB_URI: process.env.MONGODB_URI ? "✅ Set" : "❌ Missing",
    MONGODB_URL: process.env.MONGODB_URL ? "✅ Set" : "❌ Missing",
    NODE_ENV: process.env.NODE_ENV || "not set",
  }

  console.log("Environment Variables Check:", envVars)

  return NextResponse.json({
    message: "Environment Variables Status",
    variables: envVars,
    timestamp: new Date().toISOString(),
  })
}
