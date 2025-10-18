-- ========================================
-- Jeu de données de test pour Maets (MariaDB)
-- ========================================

-- Nettoyage
DELETE FROM user_game;
DELETE FROM user_role;
DELETE FROM jeux;
DELETE FROM users;
DELETE FROM role;

-- Réinitialisation des auto-incréments
ALTER TABLE users AUTO_INCREMENT = 1;
ALTER TABLE role AUTO_INCREMENT = 1;
ALTER TABLE jeux AUTO_INCREMENT = 1;

-- ========================================
-- Rôles
-- ========================================
INSERT INTO role (nom) VALUES 
('ROLE_USER'),
('ROLE_ADMIN');

-- ========================================
-- Utilisateurs
-- bcrypt hash du mot de passe "password"
-- généré avec bcrypt.hash("password", 10)
-- ========================================
INSERT INTO users (email, passwordHash, username) VALUES
('admin@maets.com', '$2b$10$eMs7NhZvZU5rwjhkRSazyOGa2mdxiMrSf3L/y0tG03lXfHUrMZV.G', 'admin'),
('alice@maets.com', '$2b$10$eMs7NhZvZU5rwjhkRSazyOGa2mdxiMrSf3L/y0tG03lXfHUrMZV.G', 'alice'),
('bob@maets.com',   '$2b$10$eMs7NhZvZU5rwjhkRSazyOGa2mdxiMrSf3L/y0tG03lXfHUrMZV.G', 'bob');

-- ========================================
-- Attribution des rôles
-- ========================================
-- admin → ROLE_ADMIN
INSERT INTO user_role (userId, roleId)
SELECT u.id, r.id
FROM users u, role r
WHERE u.email = 'admin@maets.com' AND r.nom = 'ROLE_ADMIN';

-- alice & bob → ROLE_USER
INSERT INTO user_role (userId, roleId)
SELECT u.id, r.id
FROM users u, role r
WHERE u.email IN ('alice@maets.com','bob@maets.com') AND r.nom = 'ROLE_USER';

-- ========================================
-- Jeux
-- ========================================
INSERT INTO jeux (slug, title, publisher, dateSortie) VALUES
('zelda-tp', 'The Legend of Zelda: Twilight Princess', 'Nintendo', '2006-11-19'),
('witcher-3', 'The Witcher 3: Wild Hunt', 'CD Projekt', '2015-05-19'),
('minecraft', 'Minecraft', 'Mojang', '2011-11-18');

-- ========================================
-- Librairie utilisateurs
-- ========================================
-- Alice → Zelda & Minecraft
INSERT INTO user_game (userId, gameId)
SELECT u.id, j.id
FROM users u, jeux j
WHERE u.email = 'alice@maets.com' AND j.slug = 'zelda-tp';

INSERT INTO user_game (userId, gameId)
SELECT u.id, j.id
FROM users u, jeux j
WHERE u.email = 'alice@maets.com' AND j.slug = 'minecraft';

-- Bob → The Witcher 3
INSERT INTO user_game (userId, gameId)
SELECT u.id, j.id
FROM users u, jeux j
WHERE u.email = 'bob@maets.com' AND j.slug = 'witcher-3';
