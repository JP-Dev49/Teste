import express from 'express';
import cors from 'cors'
import sequelize from 'sequelize'
import userRouter from './src/routes/usersRoute.js'
import { ServerError, NotAuthourized, BadRequest } from "./src/error/error.js"
import productRouter from './src/routes/productsRoute.js'
import order from './src/models/orderModels.js'
/*
deleteItem
addItem
getAllOrder
getAll
getOfOrder
*/
const app = express();
app.use(cors())
app.use(express.json())
app.use('/user',userRouter)
app.use('/product',productRouter)

app.use((err, req, res, next) => {
  if (err  instanceof BadRequest) {
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