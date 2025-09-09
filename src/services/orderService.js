import Order from '../models/orderModels.js'
import { orderSchema } from '../utils/validationSchema.js'

export const createOrder = async ({ userId, session: { order } }) => {
  try {
    const { error, value } = orderSchema.validate(items)
    if (error) {
      throw new Error('erro nas credenciais');
    }
    const newOrder = await Order.create({ userId, order })
    const orders = await getOrderByUser(userId)
    return orders
  } catch (err) {
    throw err

  }
}

export const getAll = async () => {
  try {
    const Orders = await Order.getAllOrder()
    const items = await Order.getAllItems()
    Orders.forEach((i) => {
      i.items = items.filter((item) => item.pedido_id === i.id);
    });
    return Orders
  } catch (err) {
    throw err

  }
}
export const getOrderByUser = async (userId) => {
  try {
    const Orders = await Order.getByUser(userId)
    Orders.forEach(async (item) => {
      item.items = await Order.getItemsByOrder(item.id)
    });
    return Orders
  } catch (err) {
    throw err
  }
}
export const getOneOrder = async (id) => {
  try {
    const order = await Order.getOrderById(id)
    order[0].items = await Order.getItemsByOrder(id)

  } catch (err) {
    throw err

  }
}

export const deleteOrderByUser = async (userId, orderId) => {
  try {
    await Order.deleteOrder(orderId)
    const orders = await getOrderByUser(userId)
    return orders

  } catch (err) {
    throw new err;

  }
}
export const deleteOrderByADM = async (userId, orderId) => {
  try {
    await Order.deleteOrder(orderId)
    const orders = await getAll()
    return orders

  } catch (err) {
    throw new err;

  }
}
export const deleteOrderItem = async (itemId, orderId) => {
  try {
    await Order.deleteItem(itemId)
    const order = await getOrderById(orderId)
    return order
  } catch (err) {

    throw err

  }
};

export const addItemsAtOrder = async (orderId, { items }) => {
  try {
    const { error, value } = orderSchema.validate(items)
    if (error) {
      throw new Error('erro nas credenciais');
    }
    await Order.addItems(items)
  } catch (err) {
    throw err

  }
}

