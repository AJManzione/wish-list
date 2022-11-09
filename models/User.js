const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class User extends Model {}
User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      firs_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      firs_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        
      }
    },
    {
      sequelize,
      freezeTableName: true,
      underscored: true,
      modelName: 'user',
      timestamps: false,
    }
  );
  
  module.exports = user;