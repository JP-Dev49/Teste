import db from './src/config/db.js';
import {port} from './src/config/variables.js'
import app from './app.js';

function init() {
  console.log("connecting at Database...")
  db.getConnection().then(()=>{
  console.log('Database connected');
  app.listen(port,()=>{
    console.log(`server running on port ${port}`)
  })
}).catch((error) => {
  console.log('erro ao conectar ao Database ou ao iniciar o servidor: ',error);})
  
}

init()


  
