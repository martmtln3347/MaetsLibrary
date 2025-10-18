import { Router } from "express";
import { listGames, addGame, updateGame, deleteGame } from "../Controleur/game.controller.js";
import { authenticate, authorizeRole } from "../middlewares/auth.js";

const router = Router();

// Liste publique des jeux
router.get("/", listGames);

// Routes protégées (ADMIN)
router.post("/", authenticate, authorizeRole("ADMIN"), addGame);
router.patch("/:id", authenticate, authorizeRole("ADMIN"), updateGame);
router.delete("/:id", authenticate, authorizeRole("ADMIN"), deleteGame);

export default router;
