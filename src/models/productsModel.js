import db from "../config/db.js";

export default class Product {
    constructor({ nome, preco, quantidade }) {
        (this.nome = nome),
            (this.preco = preco),
            (this.quantidade = quantidade);
    }
    static async create({ nome, preco, quantidade }) {
        try {
            const conn = await db.getConnection();
            await conn.execute(
                "INSERT INTO produtos (nome,preco,quantidade) VALUES (?,?,?)",
                [nome, preco, quantidade]
            );
            conn.release();
        } catch (err) {
            throw new Error("erro adicionar no banco");
        }
    }
    static async getAll() {
        try {
            const conn = await db.getConnection();
            const products = await conn.execute("SELECT * FROM produtos");
            conn.release();
            return products;
        } catch (err) {
            throw new err();
        }
    }
    static async findByName(nome) {
        try {
            const conn = await db.getConnection();
            const product = await conn.execute(
                "SELECT * FROM produtos WHERE nome = ?",
                [nome]
            );
            conn.release();
            return product;
        } catch (err) {
            throw new err();
        }
    }
    static async findById(id) {
        try {
            const conn = await db.getConnection();
            const product = await conn.execute(
                "SELECT * FROM produtos WHERE id = ?",
                [id]
            );
            conn.release();
            return product;
        } catch (err) {
            throw new Error('erro ao encontrar no banco');
        }
    }
    static async update(id, data) {
        try {
            const campos = Object.keys(data);
            let values = Object.values(data);
            values.push(id);
            const conn = await db.getConnection();
            await conn.execute(
                `UPDATE produtos SET ${campos.map(
                    c => `${c} = ? `
                )} WHERE id = ?`,
                values
            );

            conn.release();
        } catch (err) {
            throw new Error("erro ao actualizar no banco");
        }
    }
    static async Delete(id) {
        try {
            const conn = await db.getConnection();
            const product = await conn.execute(
                "DELETE FROM produtos WHERE id = ?",[id]);
            conn.release();
            return product;
        } catch (err) {
            throw err
        }
    }
}
