import express from "express";
import { getLibrary, addToLibrary, removeFromLibrary } from "../Controleur/library.controller.js";
import { authMiddleware } from "../middlewares/auth.js";

const router = express.Router();

// /me/library → déjà préfixé dans app.js
router.get("/", authMiddleware, getLibrary);
router.post("/:gameId", authMiddleware, addToLibrary);
router.delete("/:gameId", authMiddleware, removeFromLibrary);

export default router;
