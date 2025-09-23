import GameConfig from '../Modele/config.model.js';
import { formatConfig } from '../Vue/config.view.js';

export async function getConfig(req, res) {
  const userId = req.user?.id || 1;
  const { gameId } = req.params;
  const cfg = await GameConfig.findOne({ userId, gameId });
  if (!cfg) return res.status(404).json({ error: 'Config introuvable' });
  res.json(formatConfig(cfg));
}

export async function updateConfig(req, res) {
  const userId = req.user?.id || 1;
  const { gameId } = req.params;
  const update = { settings: req.body };
  const cfg = await GameConfig.findOneAndUpdate({ userId, gameId }, update, { new: true, upsert: true });
  res.json(formatConfig(cfg));
}
