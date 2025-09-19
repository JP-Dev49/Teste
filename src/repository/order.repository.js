import db from "../config/db.js";
import { Order, Items } from "../models/order.model.js"

class OrderRepository {
  constructor(userId, items) {
    this.usuario_id = userId,
      this.items = items
  }

  static async create(data) {
    try {
      const { usuario_id, items } = new this(data)
      const total = items.reduce((acc, curr) => {
        return acc + curr.preco * curr.quantidade;
      }, 0);
      const order = await Order.create({ usuario_id })
      const pedidoId = order.id;
      items.forEach(item => {
        item.unshift(pedidoId);
      });
      const item = await Items.bulkCreate(items)
      await Order.update({}, {
        where: {
          id: pedidoId
        }
      })

    } catch (err) {
      throw err
    }
  }

  static async addItems(items) {
    try {
      const item = Items.create(items);
      return item
    } catch (err) {
      throw err;
    }
  }
  static async getAllOrder() {
    try {
      const conn = await db.getConnection();
      const order = await Order.findAll({
        attributes: [["id", "dono_do_pedido"]],
        include: [
          {
            model: User,
            attributes: ["nome"]
          }
        ]
      })
      const Orders = await conn.execute("SELECT p.id,u.nome as dono_do_pedido ,p.status,p.data_pedido,p.total FROM pedidos p INNER JOIN usuarios u ON p.usuario_id = u.id ");
      conn.release();
      return Orders;
    } catch (err) {
      throw err;
    }
  }
  static async getOrderById(id) {
    try {
      const conn = await db.getConnection();
      const Orders = await conn.execute("SELECT p.id,u.nome as dono_do_pedido ,p.status,p.data_pedido,p.total FROM pedidos p INNER JOIN usuarios u ON p.usuario_id = u.id WHERE p.id = ?", [id]);
      conn.release();
      return Orders;
    } catch (err) {
      throw err;
    }
  }
  static async getByUser(userId) {
    try {
      const conn = await db.getConnection();
      const Orders = await conn.execute("SELECT p.id,u.nome as dono_do_pedido ,p.status,p.data_pedido,p.total FROM pedidos p INNER JOIN usuarios u ON p.usuario_id = u.id WHERE p.usuario_id = ?", [userId]);
      conn.release();
      return Orders;
    } catch (err) {
      throw err;
    }
  }
  static async getAllItems() {
    try {
      const conn = await db.getConnection();
      const itens = await conn.execute("SELECT i.id,p.nome AS nome_do_item, i.pedido_id,i.quantidade,i.preco_unitario FROM itens_pedido i INNER JOIN produtos p ON p.id = i.produto_id");
      conn.release();
      return itens;
    } catch (err) {
      throw err;
    }
  }

  static async getItemsByOrder(id) {
    try {
      const items = await Items.findAll({
        where: {
          pedido_id: id
        }
      })
      return items
    } catch (err) {
      throw err;
    }
  }

  static async deleteItem(id) {
    let conn;
    try {
      await Items.destroy({
        where: {
          id: id
        }
      })

    } catch (err) {
      throw err
    }
  }

  static async deleteOrder(id) {
    try {

      await Order.destroy({
        where: {
          id: id
        }
      })
      await Items.destroy({
        where: {
          pedido_id: id
        }
      })

    } catch (err) {
      throw err
    }
  }
}
export default Order