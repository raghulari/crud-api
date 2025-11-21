import express from "express";
import { registerUser, loginUser, dashboard } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/dashboard", dashboard);

export default router;
