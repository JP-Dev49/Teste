

export const verifyTokenUser = async (req,res,next) => {
    const verify = jwt.verify(token, keyJWT, {
        expiresIn: "1h",
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
