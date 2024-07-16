import Admin from "../modules/admin/adminModel.js";
import { verifyToken } from "../utils/verifyToken.js";

const admin = async (req, res, next) => {
  // Extract the token from the Authorization header
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  // Verify and decode the token
  try {
    let userId = verifyToken(token);
    // const db = process.env.MONGO_URI;
    // await mongoose.connect(db);
    let user = await Admin.findOne({ _id: userId }).select("-password");
    if (!user) {
      return res
        .status(401)
        .json({ message: "Token is Expired, Login Again", status: 0 });
    } else {
      next();
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

export default admin;
