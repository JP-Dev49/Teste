import db from "../config/db.js";

class Order {
  constructor(userId, items) {
    this.usuario_id = userId,
      this.items = body
  }

  static async create(data) {
    const { usuario_id, items } = new this(data)
    let conn;
    try {
      conn = await db.getConnection();
      await conn.beginTransaction();

      const pedidoResult = await conn.query(
        "INSERT INTO pedidos (usuario_id) VALUES (?)",
        [usuario_id]
      );
      const pedidoId = pedidoResult.insertId;
      items.forEach(item => {
        item.unshift(pedidoId);
      });

      await conn.batch(
        "INSERT INTO itens_pedido (pedido_id, produto_id, quantidade,preco_unitario) VALUES (?, ?, ?,?)",
        items
      );
      await conn.execute(
        "UPDATE pedidos p SET total = (SELECT SUM(quantidade * preco_unitario) FROM itens_pedido ip WHERE ip.pedido_id = p.id) WHERE id = ?",
        [pedidoId]
      );

      await conn.commit();


    } catch (err) {
      if (conn) await conn.rollback();

      throw err;
    } finally {
      if (conn) conn.release();
    }
  }

  static async addItems(items) {
    try {
      let conn = await db.getConnection();

      await conn.batch(
        "INSERT INTO itens_pedido (pedido_id, produto_id, quantidade,preco_unitario) VALUES (?, ?, ?,?)",
        items
      );

      conn.release();
    } catch (err) {
      throw err;
    }
  }
  static async getAllOrder() {
    try {
      const conn = await db.getConnection();
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
      const conn = await db.getConnection();
      const itens = await conn.execute(
        "SELECT * FROM itens_pedido WHERE pedido_id = ?",
        [id])
      conn.release()

      return itens
    } catch (err) {
      throw err;
    }
  }

  static async deleteItem(id) {
    let conn;
    try {
      conn = await db.getConnection;
      await conn.query(
        "DELETE FROM itens_pedido WHERE id = ?",
        [id]
      );
    } catch (err) {
      throw err;
    } finally {
      if (conn) {
        conn.release();
      }
    }
  }

  static async deleteOrder(id) {
    let conn;
    try {
      conn = await db.getConnection();
      await conn.beginTransaction();

      const pedidoResult = await conn.query(
        "DELETE FROM pedidos WHERE id = ?",
        [id]
      );

      await conn.query("DELETE FROM itens_pedido WHERE pedido_id = ?", [id]);

      await conn.commit();
    } catch (err) {
      if (conn) await conn.rollback();
      console.log({ itens: itens });
      throw err;
    } finally {
      if (conn) conn.release();
      console.log("query feita com sucesso");
    }
  }
}

export default Order