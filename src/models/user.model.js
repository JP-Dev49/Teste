import sequelize from "../config/database/database.js"
import { Model, DataTypes } from "sequelize"

class User extends Model { }
User.init({
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tipo: {
    type: DataTypes.STRING,
    allowNull: false
  }

}, {
  sequelize,
  tableName: "usuarios",
  timestamps: false,
  underscored: true
})

export default User

