import sequelize from "../config/database/database.js"
import { Model, DataTypes } from "sequelize"

class Product extends Model { }

Product.init({
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  preco: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  tableName: "produtos",
  timestamps: false,
  underscored: true
})
export default Product;