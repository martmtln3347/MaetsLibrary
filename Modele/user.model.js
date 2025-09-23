import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelize.js';

class User extends Model {}
User.init({
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  passwordHash: { type: DataTypes.STRING, allowNull: false }
}, { sequelize, modelName: 'user' });

export default User;


