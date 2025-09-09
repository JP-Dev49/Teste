import express from 'express';
import cors from 'cors'
import userRouter from './src/routes/usersRoute.js'
import { ServerError, NotAuthourized, BadRequest } from "./src/error/error.js"
import productRouter from './src/routes/productsRoute.js'
import order from './src/models/orderModels.js'
import session from 'express-session'
import sessionOption from "./src/options/options.express-session.js"


/*
deleteItem
addItem
getAllOrder
getAll
getOfOrder
*/
const app = express();
app.use(cors())
app.use(session(sessionOption))
app.use(express.json())
app.use('/user', userRouter)
app.use('/product', productRouter)
app.get('/', (req, res) => {
  if (!req.session.views) {
    req.session.views = 1
    return res.status(200).json({sucess:true,message:'sucesso na requisição',
  data:`visitaste o nosso site ${req.session.views} vezes`})
  }
  req.session.views++
  res.status(200).json({sucess:true,message:'sucesso na requisição',
  data:`visitaste o nosso site ${req.session.views} vezes`})
})

app.use((err, req, res, next) => {
  if (err instanceof BadRequest) {
    res.status(err.status).json({
      sucess: false,
      message: err.message
    });
  }
  res.status(500).json({
    sucess: false,
    message: err.message,
    stack: err.stack
  });

});

export default app