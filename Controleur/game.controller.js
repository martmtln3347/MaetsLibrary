import Game from '../Modele/game.model.js';
import { formatGame } from '../Vue/game.view.js';

export async function listGames(req, res) {
  const games = await Game.findAll();
  res.json(games.map(formatGame));
}

export async function addGame(req, res) {
  try {
    const { slug, title, publisher, releasedAt } = req.body;
    const game = await Game.create({ slug, title, publisher, releasedAt });
    res.status(201).json(formatGame(game));
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Impossible d’ajouter le jeu' });
  }
}

export async function updateGame(req, res) {
  try {
    const game = await Game.findByPk(req.params.id);
    if (!game) return res.status(404).json({ error: 'Jeu introuvable' });
    const { slug, title, publisher, releasedAt } = req.body;
    await game.update({ slug, title, publisher, releasedAt });
    res.json(formatGame(game));
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Impossible de modifier le jeu' });
  }
}

export async function deleteGame(req, res) {
  try {
    const game = await Game.findByPk(req.params.id);
    if (!game) return res.status(404).json({ error: 'Jeu introuvable' });
    await game.destroy();
    res.json({ message: 'Jeu supprimé' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur suppression' });
  }
}
