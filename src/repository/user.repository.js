import User from "../models/user.model.js"

class userRepository {
  constructor({ nome, email, password, tipo }) {
    (this.nome = nome),
      (this.email = email),
      (this.password = password),
      (this.tipo = tipo);
  }
  static async create(data) {
    try {
      const user = await User.create(data)
      return user
    } catch (err) {
      throw err
    }
  }
  static async getAll() {
    const data = await User.findAll()
    return data
  }
  static async getByEmail(email) {
    try {
      const data = User.findOne({
        where: {
          email: email
        }
      })
      return data
    } catch (err) {
      throw err
    }
  }
  static async update(id, data) {
    try {
      const [updated] = await User.update(
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
      await User.destroy({ where: { id: id } })

    } catch (err) {
      throw err

    }
  }
}

export default userRepository