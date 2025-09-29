import User from "./user.model.js";
import Game from "./game.model.js";
import Library from "./library.model.js";
import Role from "./role.model.js";

// === User ↔ Game via Library ===
User.belongsToMany(Game, { through: Library, foreignKey: "userId" });
Game.belongsToMany(User, { through: Library, foreignKey: "gameId" });

// === User ↔ Role via user_role ===
User.belongsToMany(Role, { through: "user_role", foreignKey: "userId" });
Role.belongsToMany(User, { through: "user_role", foreignKey: "roleId" });

export { User, Game, Library, Role };
