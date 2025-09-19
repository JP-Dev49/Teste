import bcrypt from "bcryptjs";
import { ServerError, NotAuthourized, BadRequest } from "../error/error.js"
import { create, getAllUsers, updateOne, DeleteUser } from "../services/userService.js"


export const getAll = async (req, res, next) => {
  try {
    const users = await getAllUsers();
    res.status(200).json({ users: users });
  } catch (err) {
    next(err)
  }
};

export const createUser = async (req, res, next) => {
  try {

    const user = await create(req.body);
    res.status(201).json({
      sucess: true,
      message: "usuario cadastrado com sucesso",
      user: user
    });
  } catch (err) {

    next(err)
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    await updateOne(id, req.body);
    res.status(200).json({
      sucess: true,
      message: "usuario actualizado"
    });
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    await DeleteUser(id);
    res.status(200).json({
      sucess: true,
      message: "usuario apagado",
    });
  } catch (err) {

    next(err);
  }
};

export const login = async (req, res) => {

  res.status(200).json({
    suces: true,
    message: 'login feito com sucesso',
    tokens: req.tokens
  });
}