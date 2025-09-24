-- ========================================
-- Jeu de données de test pour Maets
-- ========================================

-- Nettoyage (au cas où on relance plusieurs fois)
DELETE FROM user_game;
DELETE FROM user_role;
DELETE FROM jeux;
DELETE FROM "user";
DELETE FROM role;

-- ========================================
-- Rôles
-- ========================================
INSERT INTO role (nom) VALUES 
('ROLE_USER'),
('ROLE_ADMIN');

-- ========================================
-- Utilisateurs
-- ⚠️ passwordHash correspond au mot de passe "password"
-- bcrypt hash généré pour "password"
-- $2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36hoG1B2Dk3k9l16nYc4cW.
-- ========================================
INSERT INTO "user" (email, passwordHash, username) VALUES
('admin@maets.com', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36hoG1B2Dk3k9l16nYc4cW.', 'admin'),
('alice@maets.com', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36hoG1B2Dk3k9l16nYc4cW.', 'alice'),
('bob@maets.com',   '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36hoG1B2Dk3k9l16nYc4cW.', 'bob');

-- ========================================
-- Attribution des rôles
-- ========================================
-- admin → ROLE_ADMIN
INSERT INTO user_role (userId, roleId) VALUES (1, 2);

-- alice & bob → ROLE_USER
INSERT INTO user_role (userId, roleId) VALUES 
(2, 1),
(3, 1);


INSERT INTO jeux (slug, title, publisher, dateSortie) VALUES
('zelda-tp', 'The Legend of Zelda: Twilight Princess', 'Nintendo', '2006-11-19'),
('witcher-3', 'The Witcher 3: Wild Hunt', 'CD Projekt', '2015-05-19'),
('minecraft', 'Minecraft', 'Mojang', '2011-11-18');

-- ========================================
-- Librairie utilisateurs
-- ========================================
-- Alice → Zelda & Minecraft
INSERT INTO user_game (userId, gameId) VALUES
(2, 1),
(2, 3);

-- Bob → The Witcher 3
INSERT INTO user_game (userId, gameId) VALUES
(3, 2);

-- ========================================
-- Vérifications manuelles (à exécuter dans psql)
-- ========================================
-- Vérifier les rôles :
-- SELECT * FROM role;
--
-- Vérifier les utilisateurs :
-- SELECT id, email, username FROM "user";
--
-- Vérifier les associations user ↔ role :
-- SELECT * FROM user_role;
--
-- Vérifier les jeux :
-- SELECT id, slug, title, publisher, dateSortie FROM jeux;
--
-- Vérifier la librairie des users :
-- SELECT * FROM user_game;
