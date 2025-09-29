-- ========================================
-- RESET COMPLET MAETS (MariaDB)
-- ========================================

-- 1. Suppression des tables si elles existent
DROP TABLE IF EXISTS user_game;
DROP TABLE IF EXISTS user_role;
DROP TABLE IF EXISTS jeux;
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS users;

-- 2. Création du schéma
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    passwordHash VARCHAR(255) NOT NULL,
    username VARCHAR(100)
);

CREATE TABLE role (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE user_role (
    userId INT NOT NULL,
    roleId INT NOT NULL,
    PRIMARY KEY (userId, roleId),
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (roleId) REFERENCES role(id) ON DELETE CASCADE
);

CREATE TABLE jeux (
    id INT AUTO_INCREMENT PRIMARY KEY,
    slug VARCHAR(100) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    publisher VARCHAR(255),
    dateSortie DATE
);

CREATE TABLE user_game (
    userId INT NOT NULL,
    gameId INT NOT NULL,
    dateAjout TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (userId, gameId),
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (gameId) REFERENCES jeux(id) ON DELETE CASCADE
);

-- 3. Données de test

-- Rôles
INSERT INTO role (nom) VALUES 
('ROLE_USER'),
('ROLE_ADMIN');

-- Utilisateurs (mot de passe = "password")
INSERT INTO users (email, passwordHash, username) VALUES
('admin@maets.com', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36hoG1B2Dk3k9l16nYc4cW.', 'admin'),
('alice@maets.com', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36hoG1B2Dk3k9l16nYc4cW.', 'alice'),
('bob@maets.com',   '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36hoG1B2Dk3k9l16nYc4cW.', 'bob');

-- Attribution des rôles
INSERT INTO user_role (userId, roleId)
SELECT u.id, r.id FROM users u, role r
WHERE u.email = 'admin@maets.com' AND r.nom = 'ROLE_ADMIN';

INSERT INTO user_role (userId, roleId)
SELECT u.id, r.id FROM users u, role r
WHERE u.email IN ('alice@maets.com','bob@maets.com') AND r.nom = 'ROLE_USER';

-- Jeux
INSERT INTO jeux (slug, title, publisher, dateSortie) VALUES
('zelda-tp', 'The Legend of Zelda: Twilight Princess', 'Nintendo', '2006-11-19'),
('witcher-3', 'The Witcher 3: Wild Hunt', 'CD Projekt', '2015-05-19'),
('minecraft', 'Minecraft', 'Mojang', '2011-11-18');

-- Librairies
INSERT INTO user_game (userId, gameId)
SELECT u.id, j.id FROM users u, jeux j
WHERE u.email = 'alice@maets.com' AND j.slug = 'zelda-tp';

INSERT INTO user_game (userId, gameId)
SELECT u.id, j.id FROM users u, jeux j
WHERE u.email = 'alice@maets.com' AND j.slug = 'minecraft';

INSERT INTO user_game (userId, gameId)
SELECT u.id, j.id FROM users u, jeux j
WHERE u.email = 'bob@maets.com' AND j.slug = 'witcher-3';

-- 4. Vérifications automatiques

-- Liste des utilisateurs
SELECT id, email, username FROM users;

-- Liste des rôles
SELECT * FROM role;

-- Associations user ↔ role
SELECT u.email, r.nom AS role
FROM users u
JOIN user_role ur ON u.id = ur.userId
JOIN role r ON ur.roleId = r.id;

-- Jeux
SELECT id, slug, title, publisher, dateSortie FROM jeux;

-- Librairies
SELECT u.email, j.title AS jeu
FROM users u
JOIN user_game ug ON u.id = ug.userId
JOIN jeux j ON ug.gameId = j.id;
