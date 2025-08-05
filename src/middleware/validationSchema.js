import joi from "joi";

export const validiteShemaUser = async (req, res, next) => {
    try {
        const schema = joi.object({
            nome: joi.string().min(2).required(),
            email: joi.string().email().required(),
            password: joi.string().min(6).max(10)
        });
        const validadte = await schema.validateAsync(req.body);

        next();
    } catch (error) {
        res.status(404).json({
            sucess: false,
            erro: error.details.map(e => e.message)
        });
    }
};

export const validiteShemaProduct = async (req, res, next) => {
    try {
        const schema = joi.object({
            nome: joi.string().min(2).required(),
            preco: joi.number().min(1).required(),
            quantidade: joi.number().min(1).required()
        });
        const validadte = await schema.validateAsync(req.body);

        next();
    } catch (error) {
        res.status(404).json({
            sucess: false,
            erro: error.details.map(e => e.message)
        });
    }
};
