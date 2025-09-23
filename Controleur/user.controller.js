import User from '../Modele/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { formatUser } from '../Vue/user.view.js';

export async function register(req, res) {
  try {
    const { email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ email, passwordHash: hash });
    res.status(201).json(formatUser(user));
  } catch (err) {
    res.status(400).json({ error: 'Impossible de créer l’utilisateur', details: err.message });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ error: 'Utilisateur inconnu' });

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) return res.status(401).json({ error: 'Mot de passe invalide' });

    const token = jwt.sign({ sub: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur', details: err.message });
  }
}
