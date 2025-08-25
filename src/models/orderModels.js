import db from "../config/db.js";

export default class Order {
    constructor(client_id) {
        this.client_id = client_id;
    }

    static async create({ usuario_id, itens }) {
        let conn;
        try {
            conn = await db.getConnection();
            await conn.beginTransaction();

            const pedidoResult = await conn.query(
                "INSERT INTO pedidos (usuario_id) VALUES (?)",
                [usuario_id]
            );
            const pedidoId = pedidoResult.insertId;
            itens.forEach(item => {
                item.unshift(pedidoId);
            });

            await conn.batch(
                "INSERT INTO itens_pedido (pedido_id, produto_id, quantidade,preco_unitario) VALUES (?, ?, ?,?)",
                itens
            );
            await conn.execute(
                "UPDATE pedidos p SET total = (SELECT SUM(quantidade * preco_unitario) FROM itens_pedido ip WHERE ip.pedido_id = p.id) WHERE id = ?",
                [pedidoId]
            );

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
    
    static async addItem({
        pedido_id,
        produto_id,
        quantidade,
        preco_unitario
    }) {
        try {
            let conn = await db.getConnection();
            const item = await conn.execute(
                "INSERT INTO itens_pedido (pedido_id, produto_id, quantidade,  preco_unitario) VALUES(?,?,?,?)",
                [pedido_id, produto_id, quantidade, preco_unitario]
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
            conn = await await db.getConnection();
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
