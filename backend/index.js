import express from "express";
import dotenv from "dotenv";
import authRoutes from "./modules/auth/authRoutes.js";
import menuRoutes from "./modules/menu/menuRoutes.js"
import restaurantRoutes from "./modules/restaurant/restaurantRoutes.js"
import initAdmin from "./config/initAdmin.js";
import connectDB from "./config/db.js";
import cors from "cors";
import bodyParser from "body-parser";

dotenv.config();

const app = express();

connectDB();

//for PayloadTooLargeError: request entity too large
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));

app.use(bodyParser.json());
app.use(cors());


// Init Middleware
app.use(express.json({ extended: false }));

// Initialize Admin User
initAdmin();

// Define Routes
app.use("/api/auth", authRoutes);
app.use("/api", restaurantRoutes);
app.use("/api/menu", menuRoutes)

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
