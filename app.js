import express from 'express';
import userRouter from './src/routes/usersRoute.js'

import productRouter from './src/routes/productsRoute.js'
const app = express();
app.use(express.json())
app.use('/user',userRouter)
app.use('/product',productRouter)

app.get('/',(req,res)=>{
  res.json("hello world")
})

export default app
