import express from "express";
import adminAuth from "../../middleware/admin.js";
import { createRestaurant, deleteRestaurant, getAllRestaurants, getRestaurantById, updateRestaurant } from "./restaurantController.js";
const router = express.Router();




router.post("/createRestaurant", createRestaurant);
router.post("/updateRestaurant", updateRestaurant);
router.get("/getRestaurants", getAllRestaurants);
router.post("/getRestaurantDetails/", getRestaurantById);
router.post("/deleteRestaurant", deleteRestaurant);

export default router;
