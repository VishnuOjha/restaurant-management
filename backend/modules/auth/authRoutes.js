import { Router } from "express";
import { signup, login } from "./authController.js";

import auth from "../../middleware/auth.js";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);



export default router;
