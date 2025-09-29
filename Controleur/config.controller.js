import { ObjectId } from "mongodb";
import sequelize from "../config/sequelize.js";
import User from "../Modele/user.model.js";
import Game from "../Modele/game.model.js";
import { getMongoDb } from "../config/mongo.js";

// GET /me/configs/:gameId
export const getConfig = async (req, res) => {
  try {
    const userId = req.user.id; // récupéré via JWT
    const gameId = parseInt(req.params.gameId, 10);

    // Vérif SQL : le jeu existe ?
    const game = await Game.findByPk(gameId);
    if (!game) {
      return res.status(404).json({ error: "Jeu non trouvé" });
    }

    // Récup Mongo
    const db = await getMongoDb();
    const config = await db.collection("game_configs").findOne({ userId, gameId });

    if (!config) {
      return res.status(404).json({ error: "Aucune config trouvée pour ce jeu" });
    }

    res.json(config);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// PUT /me/configs/:gameId
export const updateConfig = async (req, res) => {
  try {
    const userId = req.user.id;
    const gameId = parseInt(req.params.gameId, 10);
    const newSettings = req.body.settings;

    if (!newSettings) {
      return res.status(400).json({ error: "Les settings sont requis" });
    }

    // Vérif SQL : le jeu existe ?
    const game = await Game.findByPk(gameId);
    if (!game) {
      return res.status(404).json({ error: "Jeu non trouvé" });
    }

    // Connexion Mongo
    const db = await getMongoDb();

    // Upsert (update ou insert si ça n’existe pas)
    await db.collection("game_configs").updateOne(
      { userId, gameId },
      { $set: { settings: newSettings } },
      { upsert: true }
    );

    const updated = await db.collection("game_configs").findOne({ userId, gameId });

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};
