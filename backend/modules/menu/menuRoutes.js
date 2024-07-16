import express from "express";
import { createMenu, deleteMenu, getMenu, updateMenu } from "./menuController.js"

const router = express.Router();

// Menu routes
router.post("/getMenu", getMenu);
router.post("/createMenu", createMenu);
router.post("/updateMenu", updateMenu);
router.post("/deleteMenu", deleteMenu);


export default router;
