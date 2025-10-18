import { Router } from "express";
import { register, login } from "../Controleur/user.controller.js";

const router = Router();

// ✅ Routes cohérentes avec les tests et app.use("/auth", userRoutes)
router.post("/register", register);
router.post("/login", login);

export default router;
