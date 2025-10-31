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

// --- Swagger --- //
import setupSwagger from "./config/swagger.js";
setupSwagger(app);

// ✅ Export de l’app pour les tests
export default app;

// --- Lancement du serveur uniquement si pas en mode test --- //
if (process.env.NODE_ENV !== "test") {
  // --- DB NoSQL (MongoDB) --- //
  // (Optionnel) synchro des index du modèle de config pour garantir l'unicité userId+gameId
  import("./Modele/config.model.js").then(({ default: GameConfig }) => {
    mongoose
      .connect(process.env.MONGO_URL)
      .then(async () => {
        console.log("✅ MongoDB OK");
        try {
          await GameConfig.syncIndexes();
          console.log("🧱 Index MongoDB synchronisés (GameConfig)");
        } catch (e) {
          console.error("⚠️ syncIndexes(GameConfig) a échoué:", e.message);
        }
      })
      .catch((err) => console.error("❌ MongoDB KO:", err));
  });

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

import fs from "fs";
import https from "https";

if (process.env.NODE_ENV !== "test") {
  const SSL_PORT = process.env.SSL_PORT || 3443;

  // ⚠️ Utilise bien les PEM générés par mkcert ci-dessus
  const key = fs.readFileSync("./ssl/localhost-key.pem");
  const cert = fs.readFileSync("./ssl/localhost-cert.pem");

  https.createServer({ key, cert }, app).listen(SSL_PORT, () => {
    console.log(`🔒 HTTPS (mkcert) sur https://localhost:${SSL_PORT}`);
  });
}

