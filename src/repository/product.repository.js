import Product from "../models/product.model.js"

class ProductRepository {
  constructor({ nome, preco, quantidade }) {
    (this.nome = nome),
      (this.preco = preco),
      (this.quantidade = quantidade);
  }
  static async create(data) {
    try {
      const product = await Product.create(data)
      return product
    } catch (err) {
      throw err
    }
  }
  static async getAll() {
    const data = await Product.findAll()
    return data
  }
  static async getByName(nome) {
    try {
      const data = Product.findOne({
        where: {
          nome: nome
        }
      })
      return data
    } catch (err) {
      throw err
    }
  }
  static async getById(id) {
    try {
      const data = Product.findOne({
        where: {
          id: id
        }
      })
      return data
    } catch (err) {
      throw err
    }
  }
  static async update(id, data) {
    try {
      const [updated] = await Product.update(
        data, {
        where: {
          id: id
        }
      }
      )
      return updated
    } catch (err) {
      throw err
    }

  }
  static async Delete(id) {
    try {
      await Product.destroy({ where: { id: id } })

    } catch (err) {
      throw err

    }
  }

}

export default ProductRepository