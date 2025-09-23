import jwt from 'jsonwebtoken';

export function authenticate(req, res, next) {
  const header = req.headers['authorization'];
  if (!header) return res.status(401).json({ error: 'Token manquant' });

  const token = header.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Format du token invalide' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.sub, email: decoded.email, roles: decoded.roles || [] };
    next();
  } catch (err) {
    res.status(403).json({ error: 'Token invalide ou expiré' });
  }
}

export function authorizeRole(role) {
  return (req, res, next) => {
    if (!req.user?.roles?.includes(role)) {
      return res.status(403).json({ error: 'Accès refusé' });
    }
    next();
  };
}
