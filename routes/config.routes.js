import express from "express";
import { getConfig, upsertConfig } from "../Controleur/config.controller.js";
import { authMiddleware } from "../middlewares/auth.js";

const router = express.Router();

// /me/configs → déjà préfixé dans app.js
router.get("/:gameId", authMiddleware, getConfig);
router.put("/:gameId", authMiddleware, upsertConfig);

export default router;
