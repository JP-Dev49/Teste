import { createOrder, getAll, addItemsAtOrder, getOneOrder, deleteOrderItem, getOrderByUser } from '../services/orderService.js'
import { itemSchema } from '../utils/validationSchema.js'
import {BadRequest} from '../error/error.js'
export const Baspeak = async (req, res) => {
  try {
    const orders = await createOrder(req)

    res.status(201).json({
      sucess: true,
      message: "sucesso ao criar pedido",
      data: orders
    });

  } catch (err) {
    throw err
  }
}

export const getAllOrders = async (req, res) => {
  try {
    const orders = await getAll()
    res.status(200).json({
      sucess: true,
      message: "sucesso ao buscar pedidos",
      data: orders

    });
  } catch (err) {
    throw err

  }
}

export const getAllOrdersUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const order = await getOrderByUser(id)
    res.status(200).json({
      sucess: true,
      message: "sucesso ao buscar pedidos",
      data: order
    });

  } catch (err) {
    throw err

  }
}

export const addAtOrder = async (req, res) => {
  try {
    const { error, value } = itemSchema.validate(req.body)
    if (error) {
      throw BadRequest("erro na requisição")
    }
    const item = req.body
    if (!req.session.order) {
      req.session.order = []
      req.session.order.push(item)
    }
    req.session.order.push(item)
    res.status(200).json({
      sucess: true,
      message: "pedido iniciado com sucesso",
      data: req.session.items
    });
  } catch (err) {
    throw err

  }
}
export const deleteItemAtOrder = async (req, res) => {
  try {
    const orderId = parseInt(req.params.id);
    const order = await deleteOrderItem
    res.status(200).json({ sucess: true, message: 'item deletado com sucesso ', data: order });
  } catch (err) {
    throw err

  }
}
export const getOrder = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const order = await getOneOrder(id)
  } catch (err) {
    console.error('Error:', err);

  }
}