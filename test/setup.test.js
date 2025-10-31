// test/setup.test.js
import { execSync } from "child_process";
import dotenv from "dotenv";

dotenv.config();

before(async function () {
  this.timeout(20000); // marge pour le seed SQL

  console.log("♻️  Réinitialisation de la base de données avant les tests...");
  try {
    execSync(
      `mysql -h ${process.env.MYSQL_HOST} -P ${process.env.MYSQL_PORT} -u ${process.env.MYSQL_USER} -p${process.env.MYSQL_PASSWORD} ${process.env.MYSQL_DATABASE} < seed.sql`,
      { stdio: "inherit", shell: true }
    );
    console.log("✅ Base de test réinitialisée !");
  } catch (err) {
    console.error("❌ Erreur lors du reset de la base :", err.message);
    throw err;
  }
});
