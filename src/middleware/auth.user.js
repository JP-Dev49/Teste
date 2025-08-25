import bcrypt from "bcryptjs";
import User from "../models/usersModel.js";
import { generateToken } from "../services/tokenAcess.js";

export const authUser = async (req, res,next) => {
  const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            sucess: false,
            message: `faltando dados`
        });
    }
    const find = await User.findByEmail(email);
    if (find.length == 0){
        return res
            .status(401)
            .json({ sucess: false, message: "sem autorização" });
    }
    try {
      
    const verify = await bcrypt.compare(password, find[0].password);
    if (!verify) {
        return res
            .status(401)
            .json({ sucess: false, message: "senha incorreta" });
    }
    const tokens = await generateToken(find)
    req.tokens = tokens
    next()
    } catch (err) {
      res.status(500).json({ 
        sucess: false,
        message: err.message,
        
      });
      
    }
};

export const verifyTokenUser = async (req,res,next) => {
    const verify = jwt.verify(token, keyJWT, {
        
        subject: "cliente_da_loja",
        issuer: "localhost:3128",
        audience: "localhost"
    });
    if(!verify){
      res.status(401).json({
        sucess:false,
        message: 'token inválido '
      })
    }
    next()
};

export const verifyTokenADM = async (req,res,next) => {
    const verify = jwt.verify(token, keyJWT, {
        
        subject: "adm_da_loja",
        issuer: "localhost:3128",
        audience: "localhost"
    });
    if(!verify){
      res.status(401).json({
        sucess:false,
        message: 'token inválido '
      })
    }
    next()
};
