import { Router } from "express";
import productRoutes from "../product/productRoutes.js";

const router = Router();



// Product routes
router.use("/products", productRoutes);




export default router;
