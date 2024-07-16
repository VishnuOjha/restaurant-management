import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../admin/adminModel.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { encryptPassword } from "../../utils/encryptPassword.js";

dotenv.config();

export const signup = async (req, res) => {
  const { name, email, password, mobileNumber, shopDetails } = req.body;

  try {
    // const db = process.env.MONGO_URI;
    // await mongoose.connect(db);

    let user = await Admin.findOne({ mobileNumber });
    if (user) {
      return res
        .status(200)
        .json({ message: "Mobile Number already registered", status: 0 });
    }

    user = new Admin({
      name,
      email,
      password,
    });

    user.password = await encryptPassword(password);

    await user.save();

    const payload = { user: { id: user.id } };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;
        return res
          .status(200)
          .json({ message: "Signup successfully", token, status: 1 });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
  // finally {
  //   // Disconnect from MongoDB
  //   mongoose.connection.close();
  // }
};

export const login = async (req, res) => {
  const { email, password: pass } = req.body;

  // console.log("DDDDDDDDDD", email, pass)

  // try {
  //   // const db = process.env.MONGO_URI;
  //   // await mongoose.connect(db);

  //   if (!user) {
  //     return res
  //       .status(200)
  //       .json({ message: "User not found, please signup.", status: 0 });
  //   }


  //   const isMatch = await bcrypt.compare(pass, user?.password);
  //   if (!isMatch) {
  //     res.status(200).json({ message: "Invalid Credentials", status: 0 });
  //   }

  //   const payload = { user: { id: user.id } };

  //   const { password, updatedAt, createdAt, ...responseUser } = user._doc;

  //   jwt.sign(
  //     payload,
  //     process.env.JWT_SECRET,
  //     { expiresIn: "1h" },
  //     (err, token) => {
  //       if (err) throw err;
  //       return res.status(200).json({
  //         message: "Login successfully",
  //         token,
  //         status: 1,
  //         user: responseUser,
  //       });
  //     }
  //   );
  // } catch (err) {
  //   console.error(err.message);
  //   res.status(500).send("Server error");
  // }



  try {
    let user = await Admin.findOne({ email });
    const isMatch = await bcrypt.compare(pass, user?.password);
    // Your authentication logic here
    if (!user) {
      return res
        .status(200)
        .json({ message: "User not found, please signup.", status: 0 });
    } else if (!isMatch) {
      return res.status(200).json({ message: "Invalid Credentials", status: 0 });
    } else {
      return res.status(401).json({ message: 'Authentication failed' });
    }
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }

};
