import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelize.js';

class Game extends Model {}
Game.init({
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  slug: { type: DataTypes.STRING, allowNull: false, unique: true },
  title: { type: DataTypes.STRING, allowNull: false },
  publisher: { type: DataTypes.STRING },
  releasedAt: { type: DataTypes.DATE }
}, { sequelize, modelName: 'game' });

export default Game;
