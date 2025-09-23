import Library from '../Modele/library.model.js';
import Game from '../Modele/game.model.js';
import { formatLibraryEntry } from '../Vue/library.view.js';

export async function getLibrary(req, res) {
  const userId = req.user?.id || 1; // temporaire si pas encore JWT
  const entries = await Library.findAll({ where: { userId }, include: [Game] });
  res.json(entries.map(e => ({ ...formatLibraryEntry(e), game: e.game })));
}

export async function addToLibrary(req, res) {
  const userId = req.user?.id || 1;
  try {
    const entry = await Library.create({ userId, gameId: req.params.gameId });
    res.status(201).json(formatLibraryEntry(entry));
  } catch (err) {
    res.status(400).json({ error: 'Impossible d’ajouter à la librairie', details: err.message });
  }
}

export async function removeFromLibrary(req, res) {
  const userId = req.user?.id || 1;
  try {
    const deleted = await Library.destroy({ where: { userId, gameId: req.params.gameId } });
    if (!deleted) return res.status(404).json({ error: 'Pas trouvé' });
    res.json({ message: 'Jeu retiré de la librairie' });
  } catch (err) {
    res.status(500).json({ error: 'Erreur suppression', details: err.message });
  }
}
