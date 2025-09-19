import userRepository from "../repository/user.repository.js"
import bcrypt from "bcryptjs"
import { BadRequest } from "../error/error.js"

async function create(data) {
  try {
    const find = await userRepository.getByEmail(data.email);

    if (find) {
      throw new BadRequest('usuario já cadastrado ')
    }
    const hash = await bcrypt.hash(data.password, 10);
    data.password = hash;
    data.tipo = "cliente";
    const newUser = new userRepository(data);
    const user = await userRepository.create(newUser);
    return user

  }
  catch (err) { throw err }
}
async function getAllUsers() {
  try {
    const users = await userRepository.getAll()
    return users
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
    const user = await userRepository.update(id, data)
  } catch (err) {
    throw err
  }
}
async function DeleteUser(id) {
  await userRepository.Delete(id)
}
export {
  create,
  getAllUsers,
  updateOne,
  DeleteUser
}