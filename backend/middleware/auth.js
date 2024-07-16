import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { verifyToken } from "../utils/verifyToken.js";
import Admin from "../modules/admin/adminModel.js";

dotenv.config();

const auth = async (req, res, next) => {
  // Extract the token from the Authorization header
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    // Verify and decode the token
    let userId = verifyToken(token);

    // Check if the user is active
    if (userId) {
      let user = await Admin.findOne({ _id: userId }).select("-password");
      if (!user.isActive) {
        return res
          .status(403)
          .json({ message: "Account is deactivated", status: 0 });
      }
      next();
    } else {
      return res.status(403).json({ message: "Invalid token", status: 0 });
    }
  } catch (err) {
    res.status(401).json({ message: "Token is not valid", status: 0 });
  }
};

export default auth;
