-- ========================================
-- Vérification du jeu de données Maets
-- ========================================

-- 1. Liste des tables existantes
SHOW TABLES;

-- 2. Vérifier le nombre de lignes par table
SELECT 'users' AS table_name, COUNT(*) AS total FROM users
UNION ALL
SELECT 'role', COUNT(*) FROM role
UNION ALL
SELECT 'user_role', COUNT(*) FROM user_role
UNION ALL
SELECT 'jeux', COUNT(*) FROM jeux
UNION ALL
SELECT 'user_game', COUNT(*) FROM user_game;

-- 3. Vérifier les utilisateurs
SELECT id, email, username FROM users;

-- 4. Vérifier les rôles
SELECT * FROM role;

-- 5. Vérifier les associations user ↔ role
SELECT u.email, r.nom AS role
FROM users u
JOIN user_role ur ON u.id = ur.userId
JOIN role r ON ur.roleId = r.id;

-- 6. Vérifier les jeux
SELECT id, slug, title, publisher, dateSortie FROM jeux;

-- 7. Vérifier la librairie (user ↔ jeux)
SELECT u.email, j.title AS jeu
FROM users u
JOIN user_game ug ON u.id = ug.userId
JOIN jeux j ON ug.gameId = j.id;
