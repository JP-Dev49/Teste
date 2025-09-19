import db from './src/config/db.js';
import { port } from './src/config/variables.js'
import app from './app.js';
import sequelize from "./src/config/database/database.js"

async function init() {
  try {
    console.log("connecting at Database...")
    db.getConnection().then(async () => {
      console.log('Database connected');
      console.log("conecting database with sequelize ...")
      await sequelize.authenticate()
      console.log("Database conected");
      app.listen(port, () => {
        console.log(`server running on port ${port}`)
      })
    }).catch((error) => {
      console.log('erro ao conectar ao Database ou ao iniciar o servidor: ', error);
    })
  } catch (err) {
    console.error('Error:', err);

  }

}

init()



