import express from 'express';
import dotenv from 'dotenv';

// Routes
import userRoutes from './routes/user.routes.js';
import gameRoutes from './routes/game.routes.js';
import libraryRoutes from './routes/library.routes.js';
import configRoutes from './routes/config.routes.js';

// Middlewares
import { errorHandler } from './middlewares/error.js';

//connect to DB
import mongoose from 'mongoose';

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("✅ MongoDB OK"))
  .catch(err => console.error("❌ MongoDB KO:", err));

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// --- Routes principales --- //
app.use('/auth', userRoutes);       // Register / Login
app.use('/games', gameRoutes);      // CRUD des jeux
app.use('/me/library', libraryRoutes); // Librairie utilisateur
app.use('/me/configs', configRoutes);  // Configurations de jeux

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', ts: new Date() });
});

// Middleware de gestion des erreurs (tout à la fin)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
});
