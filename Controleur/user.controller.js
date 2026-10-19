import User from "../Modele/user.model.js";
import Role from "../Modele/role.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { formatUser } from "../Vue/user.view.js";

// =============================
// 🔐 REGISTER
// =============================
export async function register(req, res) {
  try {
    const { email, password } = req.body;

    // --- Vérifications basiques ---
    if (!email || !password) {
      return res.status(400).json({ error: "Email et mot de passe requis" });
    }

    // --- Vérifie si l’utilisateur existe déjà ---
    const existing = await User.findOne({ where: { email } });
    if (existing) {
      return res.status(400).json({ error: "Email déjà utilisé" });
    }

    // --- Hash du mot de passe ---
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ email, passwordHash: hash });

    // --- Rôle par défaut : ROLE_USER ---
    let role = await Role.findOne({ where: { nom: "ROLE_USER" } });
    if (!role) {
      // 🔁 Création automatique si le rôle n’existe pas encore
      role = await Role.create({ nom: "ROLE_USER" });
      console.log("⚙️ Rôle ROLE_USER créé automatiquement.");
    }

    await user.addRole(role);

    // --- Réponse ---
    return res.status(201).json(formatUser(user));
  } catch (err) {
    console.error("❌ Erreur register:", err);
    return res.status(400).json({ error: "Impossible de créer l’utilisateur" });
  }
}

// =============================
// 🔑 LOGIN
// =============================
export async function login(req, res) {
  try {
    const { email, password } = req.body;

    // --- Vérifications basiques ---
    if (!email || !password) {
      return res.status(400).json({ error: "Email et mot de passe requis" });
    }

    // --- Récupération de l’utilisateur et de ses rôles ---
    const user = await User.findOne({
      where: { email },
      include: [
        {
          model: Role,
          as: "roles",
          through: { attributes: [] }, // évite de ramener les colonnes de la table pivot
        },
      ],
    });

    if (!user) {
      return res.status(401).json({ error: "Identifiants invalides" });
    }

    // --- Vérification du mot de passe ---
    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return res.status(401).json({ error: "Identifiants invalides" });
    }

    // --- Rôles associés ---
    const roles = Array.isArray(user.roles)
      ? user.roles.map((r) => r.nom)
      : [];

    // --- Génération du JWT ---
    const token = jwt.sign(
      { id: user.id, email: user.email, roles },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({ token });
  } catch (err) {
    console.error("❌ Erreur dans login:", err);
    return res.status(500).json({ error: "Erreur serveur" });
  }
}

// =============================
// ℹ️ USER PROFILE (optionnel)
// =============================
// utile si tu veux tester le décodage du JWT directement
export async function getProfile(req, res) {
  try {
    const user = await User.findByPk(req.user.id, {
      include: [
        { model: Role, as: "roles", through: { attributes: [] } },
      ],
    });

    if (!user) {
      return res.status(404).json({ error: "Utilisateur introuvable" });
    }

    res.status(200).json(formatUser(user));
  } catch (err) {
    console.error("❌ Erreur getProfile:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
}
