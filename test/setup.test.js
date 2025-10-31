// test/setup.test.js
import { execSync } from "child_process";
import dotenv from "dotenv";
import mongoose from "mongoose";
import GameConfig from "../Modele/config.model.js";

dotenv.config();

let memoryServer; // mongodb-memory-server instance

async function connectMongoForTests() {
  // 1) Si MONGO_URL est défini, on tente une connexion réelle
  if (process.env.MONGO_URL) {
    try {
      console.log("🔗 Tentative de connexion MongoDB via MONGO_URL…");
      await mongoose.connect(process.env.MONGO_URL, { serverSelectionTimeoutMS: 5000 });
      console.log("✅ MongoDB réel connecté (tests)");
      return;
    } catch (e) {
      console.warn("⚠️ Connexion MongoDB réelle impossible:", e.message);
    }
  }

  // 2) Fallback : mongodb-memory-server (en mémoire)
  console.log("🧪 Démarrage d'un MongoDB en mémoire pour les tests…");
  const { MongoMemoryServer } = await import("mongodb-memory-server");
  memoryServer = await MongoMemoryServer.create();
  const uri = memoryServer.getUri();
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
  console.log("✅ MongoDB en mémoire connecté (tests)");
}

before(async function () {
  this.timeout(30000); // seed SQL + connexion Mongo + index

  console.log("♻️  Réinitialisation de la base de données SQL avant les tests…");
  try {
    execSync(
      `mysql -h ${process.env.MYSQL_HOST} -P ${process.env.MYSQL_PORT} -u ${process.env.MYSQL_USER} -p${process.env.MYSQL_PASSWORD} ${process.env.MYSQL_DATABASE} < seed.sql`,
      { stdio: "inherit", shell: true }
    );
    console.log("✅ Base SQL de test réinitialisée !");
  } catch (err) {
    console.error("❌ Erreur lors du reset SQL :", err.message);
    throw err;
  }

  // Connexion Mongo (réelle si possible, sinon en mémoire)
  await connectMongoForTests();

  // Synchroniser les index (unicité userId+gameId)
  try {
    await GameConfig.syncIndexes();
    console.log("🧱 Index MongoDB synchronisés (GameConfig)");
  } catch (e) {
    console.warn("⚠️ syncIndexes(GameConfig) a échoué:", e.message);
  }
});

after(async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
    console.log("👋 Déconnexion MongoDB (tests) effectuée");
  }
  if (memoryServer) {
    await memoryServer.stop();
    console.log("🧹 MongoDB en mémoire arrêté");
  }
});
