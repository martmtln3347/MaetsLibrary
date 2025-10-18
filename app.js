import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

// Charger les variables d’environnement
dotenv.config();

// --- DB SQL (MariaDB avec Sequelize) --- //
import sequelize from "./config/sequelize.js";
import "./Modele/associations.js"; // associations entre User, Game, Role, Library

// --- Express --- //
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// --- Routes principales --- //
import userRoutes from "./routes/user.routes.js";
import gameRoutes from "./routes/game.routes.js";
import libraryRoutes from "./routes/library.routes.js";
import configRoutes from "./routes/config.routes.js";

app.use("/auth", userRoutes);          // Register / Login
app.use("/games", gameRoutes);         // CRUD des jeux
app.use("/me/library", libraryRoutes); // Librairie utilisateur
app.use("/me/configs", configRoutes);  // Configurations de jeux

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", ts: new Date() });
});

// Route racine
app.get("/", (req, res) => {
  res.json({ message: "Bienvenue sur l’API Maets 🚀" });
});

// --- Middleware d’erreurs --- //
import { errorHandler } from "./middlewares/error.js";
app.use(errorHandler);

// ✅ Export de l’app pour les tests
export default app;

// --- Lancement du serveur uniquement si pas en mode test --- //
if (process.env.NODE_ENV !== "test") {
  // --- DB NoSQL (MongoDB) --- //
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("✅ MongoDB OK"))
    .catch((err) => console.error("❌ MongoDB KO:", err));

  app.listen(PORT, async () => {
    try {
      await sequelize.authenticate();
      console.log("✅ Connexion MariaDB OK");
    } catch (err) {
      console.error("❌ Erreur connexion MariaDB :", err);
    }
    console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
  });
}
