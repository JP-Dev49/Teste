import db from "../config/db.js";

export default class User {
    constructor({ nome, email, password, tipo }) {
        (this.nome = nome),
            (this.email = email),
            (this.password = password),
            (this.tipo = tipo);
    }
    static async create({ nome, email, password, tipo }) {
        try {
            const conn = await db.getConnection();
            await conn.execute(
                "INSERT INTO usuarios (nome,email, password,tipo) VALUES (?,?,?,?)",
                [nome, email, password, tipo]
            );
            conn.release()
        } catch (err) {
            throw new err;
        }
    }
    static async getAll() {
        try {
            const conn = await db.getConnection();
            const users = await conn.execute("SELECT * FROM usuarios");
            conn.release();
            return users
        } catch (err) {
            throw new err();
        }
    }
    static async findByEmail(email) {
        try {
            const conn = await db.getConnection();
            const user = await conn.execute("SELECT * FROM usuarios WHERE email = ?",[email]);
            conn.release();
            return user
        } catch (err) {
            throw new err;
        }
    }
    static async findById(id) {
        try {
            const conn = await db.getConnection();
            const user = await conn.execute("SELECT * FROM usuarios WHERE id = ?",[id]);
            conn.release();
            return user
        } catch (err) {
            throw new err();
        }
    }
    static async update(id,data) {
      try {
      const campos = Object.keys(data);
      let values = Object.values(data);
      values.push(id)
      const conn = await db.getConnection();
      await conn.execute(`UPDATE usuarios SET ${campos.map(c => `${c} = ? `)} WHERE id = ?`,values)
      conn.release()
      
      } catch (err) {
        throw  Error(err)
        
      }
      
    }
    static async Delete(id) {
        try {
            const conn = await db.getConnection();
            const user = await conn.execute("DELETE FROM usuarios WHERE id = ?",[id]);
            conn.release();
            return user
        } catch (err) {
            throw new err;
        }
    }
}
