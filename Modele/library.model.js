import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelize.js';
import User from './user.model.js';
import Game from './game.model.js';

class Library extends Model {}
Library.init({
  userId: { type: DataTypes.INTEGER, allowNull: false, references: { model: User, key: 'id' } },
  gameId: { type: DataTypes.INTEGER, allowNull: false, references: { model: Game, key: 'id' } },
  addedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, { sequelize, modelName: 'library' });

// Relations
User.belongsToMany(Game, { through: Library });
Game.belongsToMany(User, { through: Library });

export default Library;
