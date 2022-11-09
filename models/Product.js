const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Product extends Model {}
Product.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      link: {
        type: DataTypes.URL,
        allowNull: true,
        validate {
            isUrl: true,
        }
      },
      price: {
        type: DataTypes.DECIMAl(10,2),
        allowNull: true,
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'category',
            key: 'id',
        }
    }
    },
    {
      sequelize,
      freezeTableName: true,
      underscored: true,
      modelName: 'product',
      timestamps: false,
    }
  );
  
  module.exports = product;