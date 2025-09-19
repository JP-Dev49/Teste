import bcrypt from "bcryptjs";
import User from "../models/usersModel.js";
import userRepository from "../repository/user.repository.js"
import { generateToken } from "../services/tokenAcess.js";

export const authADM = async (req, res, next) => {

  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        sucess: false,
        message: `faltando dados`
      });
    }
    const find = await getByEmail(email);
    if (!find) {
      return res
        .status(401)
        .json({ sucess: false, message: "sem autorização" });
    }
    if (find.tipo !== "ADM") {
      return res
        .status(403)
        .json({ sucess: false, message: "sem autorização" });
    }
    const verify = await bcrypt.compare(password, find.password);
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
export const verifyTokenADM = async (req, res, next) => {
  const verify = jwt.verify(token, keyJWT, {

    subject: "adm_da_loja",
    issuer: "localhost:3128",
    audience: "localhost"
  });
  if (!verify) {
    res.status(401).json({
      sucess: false,
      message: 'token inválido '
    })
  }
  next()
};

