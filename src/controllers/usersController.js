import User from "../models/usersModel.js";
import bcrypt from "bcryptjs";
import { ServerError, NotAuthourized, BadRequest } from "../error/error.js"


export const getAll = async (req, res,next) => {
    try {
        const users = await User.getAll();
        res.status(200).json({ users: users });
    } catch (err) {
        next(err)
    }
};

export const createUser = async (req, res,next) => {
    try {
        const find = await User.findByEmail(req.body.email);
        if (find.length > 0) {
            throw new BadRequest('usuario já cadastrado ')
        }
        const hash = await bcrypt.hash(req.body.password, 10);
        req.body.password = hash;
        req.body.tipo = "cliente";
        const newUser = new User(req.body);
        await User.create(newUser);
        const users = await User.getAll();
        res.status(201).json({
            sucess: true,
            message: "usuario cadastrado com sucesso",
            users: users
        });
    } catch (err) {
      
        next(err)
    }
};

export const updateUser = async (req, res,next) => {
    try {
        if (
            !req.body ||
            Object.keys(req.body).length == 0 ||
            Object.values(req.body) == 0
        ) {
            throw new BadRequest('erro com as credenciais');
        }
        const id = parseInt(req.params.id);
        await User.update(id, req.body);
        const user = await User.findById(id);
        res.status(200).json({
            sucess: true,
            message: "usuario actualizado",
            user: user
        });
    } catch (err) {
        next(err);
    }
};

export const deleteUser = async (req, res,next) => {
    try {
        const id = parseInt(req.params.id);
        await User.Delete(id);
        const user = await User.getAll();
        res.status(200).json({
            sucess: true,
            message: "usuario apagado",
            user: user
        });
    } catch (err) {
      
        next(err);
    }
};

export const login = async(req,res)=>{
  
  res.status(200).json({ 
    suces:true,
    message: 'login feito com sucesso',
    tokens: req.tokens
  });
}