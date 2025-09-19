import sequelize from "../config/database/database.js"
import { Model, DataTypes } from 'sequelize';

class Order extends Model { }
class Items extends Model { }

Order.init({
  usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  total: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  tableNams: "pedidos",
  timestamps: false,
  underscored: true
})

Items.init({
  pedido_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }, produto_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }, quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false
  }, preco_unitario: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  tableNams: "itens_pedido",
  timestamps: false,
  underscored: true

})

export {
  Order,
  Items
}