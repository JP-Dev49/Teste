import mariadb from 'mariadb';
const pool = mariadb.createPool({
  host: "localhost",
  user: "root",
  database: "meubanco",
  connectionLimit: 5
})

export default pool