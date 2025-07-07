import jwt from "jsonwebtoken";
import User from "../models/user.model.js";


export const protectRoute = async (req, res, next) => {
    const token = req.cookies.jwt;
    try {
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        if (!decode) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const user = await User.findById(decode.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        req.user = user;
        next();
    } catch (error) {
        console.error("Error in protectRoute middleware:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const adminOnly = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: "Access denied. Admin role required." });
        }
        
        next();
    } catch (error) {
        console.error("Error in adminOnly middleware:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
