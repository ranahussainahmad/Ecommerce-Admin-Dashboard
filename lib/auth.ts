import type { NextRequest } from "next/server"
import jwt from "jsonwebtoken"

export async function verifyToken(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value

    if (!token) {
      return null
    }

    const JWT_SECRET = process.env.JWT_SECRET
    if (!JWT_SECRET) {
      console.error("❌ Missing JWT_SECRET environment variable")
      return null
    }

    const decoded = jwt.verify(token, JWT_SECRET) as any
    return decoded
  } catch (error) {
    console.error("Token verification failed:", error)
    return null
  }
}

export const authOptions = {
  // NextAuth configuration would go here if using NextAuth
  // For now, we're using custom JWT implementation
}
