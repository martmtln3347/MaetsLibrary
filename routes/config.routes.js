import express from "express";
import { getConfig, updateConfig } from "../Controleur/config.controller.js";
import { authenticate } from "../middlewares/auth.js";

const router = express.Router();

router.get("/:gameId", authenticate, getConfig);
router.put("/:gameId", authenticate, updateConfig);


export default router;
