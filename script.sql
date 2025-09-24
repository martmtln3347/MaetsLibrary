-- base de données: PostgreSQL
-- Supprime les tables si elles existent déjà (ordre important à cause des FK)
DROP TABLE IF EXISTS user_game CASCADE;
DROP TABLE IF EXISTS user_role CASCADE;
DROP TABLE IF EXISTS jeux CASCADE;
DROP TABLE IF EXISTS role CASCADE;
DROP TABLE IF EXISTS "user" CASCADE;


CREATE TABLE "user" (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    passwordHash VARCHAR(255) NOT NULL,
    username VARCHAR(100)
);


CREATE TABLE role (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(50) UNIQUE NOT NULL
);


CREATE TABLE user_role (
    userId INT NOT NULL,
    roleId INT NOT NULL,
    PRIMARY KEY (userId, roleId),
    FOREIGN KEY (userId) REFERENCES "user"(id) ON DELETE CASCADE,
    FOREIGN KEY (roleId) REFERENCES role(id) ON DELETE CASCADE
);


CREATE TABLE jeux (
    id SERIAL PRIMARY KEY,
    slug VARCHAR(100) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    publisher VARCHAR(255),
    dateSortie DATE
);

-- ========================================
-- Table de liaison User ↔ Game (Librairie)
-- ========================================
CREATE TABLE user_game (
    userId INT NOT NULL,
    gameId INT NOT NULL,
    dateAjout TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (userId, gameId),
    FOREIGN KEY (userId) REFERENCES "user"(id) ON DELETE CASCADE,
    FOREIGN KEY (gameId) REFERENCES jeux(id) ON DELETE CASCADE
);
