# 🎮 Maets Backend — POC

Backend de démonstration pour la plateforme **Maets**, une librairie de jeux vidéo en ligne.  
Projet développé en **Node.js / Express**, avec **PostgreSQL** (SQL) et **MongoDB** (NoSQL).

---

## 🚀 Fonctionnalités principales

- Authentification utilisateur (**/auth/register**, **/auth/login**) avec **JWT**
- Gestion d’un catalogue de jeux (**/games**) stockés en SQL
- Librairie utilisateur personnelle (**/me/library**) en SQL
- Configuration par jeu (graphismes, touches, etc.) stockée en **MongoDB**
- Sécurité : **bcrypt** pour les mots de passe, **JWT** pour les accès
- Documentation de l’API avec **Swagger** (à intégrer)
- Tests avec **Mocha + Supertest**

---

## 📂 Structure du projet

PROJET-BACKEND/
Controleur/ # Logique métier (CRUD)
user.controller.js
game.controller.js
library.controller.js
config.controller.js
Modele/ # Modèles SQL (Sequelize) et NoSQL (Mongoose)
user.model.js
game.model.js
library.model.js
role.model.js
config.model.js
Vue/ # Formatage des réponses JSON (DTO)
user.view.js
game.view.js
library.view.js
config.view.js
routes/ # Définition des endpoints REST
user.routes.js
game.routes.js
library.routes.js
config.routes.js
middlewares/ # Sécurité et gestion erreurs
auth.js
error.js
config/ # Connexions DB
sequelize.js
mongo.js
app.js # Point d’entrée de l’application
sync.js # Script de création des tables SQL
package.json
docker-compose.yml
.env.example
README.md

yaml
Copier le code

---

## ⚙️ Installation

### 1. Cloner le projet
```bash
git clone <url-du-projet>
cd PROJET-BACKEND
2. Installer les dépendances
bash
Copier le code
npm install
3. Créer le fichier .env
env
Copier le code
PORT=3000
JWT_SECRET=supersecret

DATABASE_URL=postgres://maets:maets@localhost:5432/maets
MONGO_URL=mongodb://localhost:27017/maets
4. Lancer les bases de données (Docker)
bash
Copier le code
docker compose up -d
➡️ Vérifie avec :

bash
Copier le code
docker ps
Tu dois voir postgres et mongo.

5. Créer les tables SQL
bash
Copier le code
node sync.js
6. Lancer le serveur
bash
Copier le code
npm start
🛣️ Endpoints principaux
🔑 Authentification
POST /auth/register → créer un utilisateur

POST /auth/login → se connecter et recevoir un JWT

🎮 Jeux
GET /games → liste des jeux

POST /games (admin) → ajouter un jeu

PATCH /games/:id (admin) → modifier un jeu

DELETE /games/:id (admin) → supprimer un jeu

📚 Librairie utilisateur
GET /me/library → voir sa collection

POST /me/library/:gameId → ajouter un jeu

DELETE /me/library/:gameId → retirer un jeu

⚙️ Configurations (MongoDB)
GET /me/configs/:gameId → lire config d’un jeu

PUT /me/configs/:gameId → créer/modifier config

🧪 Tests
Lancer les tests (Mocha + Supertest) :

bash
Copier le code
npm test
Couverture avec nyc :

bash
Copier le code
npm run coverage
🐳 Commandes Docker utiles
Démarrer Postgres + Mongo :

bash
Copier le code
docker compose up -d
Arrêter les conteneurs :

bash
Copier le code
docker compose down
Voir les logs :

bash
Copier le code
docker compose logs -f
Vérifier les conteneurs actifs :

bash
Copier le code
docker ps
💾 Sauvegardes (critère C13)
PostgreSQL
bash
Copier le code
pg_dump -U maets -d maets -f backups/pg/maets_$(date +%F).sql
MongoDB
bash
Copier le code
mongodump --db maets --out backups/mongo/$(date +%F)
🧩 Stack technique
Node.js + Express

Sequelize (PostgreSQL)

Mongoose (MongoDB)

JWT + bcrypt

Mocha / Supertest / nyc

Swagger (documentation)

📌 Notes pédagogiques (Bloc 2)
E3 → preuve de conception et BDD SQL/NoSQL mises en placeBloc2 Syllabus - Conception et …

E4 → API sécurisée, testée, documentéeGrille Bloc 2 épreuve 4 - API s…

Module → respect MVC, REST, sauvegardesConception et Développement Bac…DBMS - MongoDB

