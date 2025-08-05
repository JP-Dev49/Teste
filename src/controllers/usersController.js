import User from "../models/usersModel.js";
import bcrypt from "bcryptjs";

export const getAll = async (req, res) => {
    try {
        const users = await User.getAll();
        res.status(200).json({ users: users });
    } catch (err) {
        res.status(500).json({
            sucess: false,
            message: "errro no servidor",
            err: err
        });
    }
};

export const createUser = async (req, res) => {
    try {
        const find = await User.findByEmail(req.body.email);
        if (find.length > 0) {
            return res
                .status(400)
                .json({
                    sucess: false,
                    message: "usuario já cadastrado ",
                    user: find[0]
                });
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
        res.status(500).json({
            sucess: false,
            message: "errro no servidor",
            err: err
        });
    }
};

export const updateUser = async (req, res) => {
    try {
        if (
            !req.body ||
            Object.keys(req.body).length == 0 ||
            Object.values(req.body) == 0
        ) {
            return res
                .status(400)
                .json({ sucess: false, message: "erro nas credenciais" });
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
        res.status(500).json({
            sucess: false,
            message: "erro ao actualizar o usuário ",
            err: err
        });
    }
};

export const deleteUser = async (req, res) => {
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
        res.status(500).json({
            sucess: false,
            message: "erro ao apagar o usuário ",
            err: err
        });
    }
};

export const login = async(req,res)=>{
  
  res.status(200).json({ 
    suces:true,
    message: 'login feito com sucesso',
    tokens: req.tokens
  });
}