import ProductRepository from "../repository/product.repository.js"
import bcrypt from "bcryptjs"
import { BadRequest } from "../error/error.js"

async function create(data) {
  try {
    const find = await ProductRepository.getByName(data.nome);

    if (find) {
      throw new BadRequest('usuario já cadastrado ')
    }
    const newproduct = new ProductRepository(data);
    const product = await ProductRepository.create(newproduct);
    return product

  }
  catch (err) { throw err }
}
async function getAllProducts() {
  try {
    const products = await ProductRepository.getAll()
    return products
  } catch (err) {
    throw err
  }
}
async function updateOne(id, data) {
  try {
    if (
      !data ||
      Object.keys(data).length == 0 ||
      Object.values(data).length == 0
    ) {
      throw new BadRequest('erro com as credenciais');
    }
    const product = await ProductRepository.update(id, data)
  } catch (err) {
    throw err
  }
}
async function DeleteProduct(id) {
  await ProductRepository.Delete(id)
}

async function findById(id) {
  try {
    const product = await ProductRepository.getById(id)
    return product

  } catch (err) {
    throw new err
  }
}
export {
  create,
  getAllProducts,
  updateOne,
  DeleteProduct,
  findById
}