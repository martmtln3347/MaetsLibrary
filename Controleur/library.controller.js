import User from "../Modele/user.model.js";
import Game from "../Modele/game.model.js";
import Library from "../Modele/library.model.js";
import { formatLibraryEntry } from "../Vue/library.view.js";

export async function getLibrary(req, res) {
  const userId = req.user?.id || 1; // temporaire si pas encore JWT
  try {
    const user = await User.findByPk(userId, {
      include: {
        model: Game,
        through: { attributes: ["dateAjout"] }, // récupère aussi la date d’ajout
      },
    });

    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }

    const games = user.Games.map(game => ({
      ...game.toJSON(),
      dateAjout: game.Library?.dateAjout, // l’alias généré par Sequelize pour la table de jointure
    }));

    res.json(games);
  } catch (err) {
    res.status(500).json({ error: "Erreur récupération librairie", details: err.message });
  }
}

export async function addToLibrary(req, res) {
  const userId = req.user?.id || 1;
  const gameId = req.params.gameId;

  try {
    await Library.create({ userId, gameId });
    res.status(201).json({ message: "Jeu ajouté à la librairie" });
  } catch (err) {
    res.status(400).json({
      error: "Impossible d’ajouter à la librairie",
      details: err.message,
    });
  }
}

export async function removeFromLibrary(req, res) {
  const userId = req.user?.id || 1;
  const gameId = req.params.gameId;

  try {
    const deleted = await Library.destroy({ where: { userId, gameId } });
    if (!deleted) return res.status(404).json({ error: "Pas trouvé" });

    res.json({ message: "Jeu retiré de la librairie" });
  } catch (err) {
    res.status(500).json({
      error: "Erreur suppression",
      details: err.message,
    });
  }
}
