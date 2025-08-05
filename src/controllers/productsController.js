import Product from "../models/productsModel.js";

export const getAll = async (req, res) => {
    try {
        const Products = await Product.getAll();
        res.status(200).json({ Products: Products });
    } catch (err) {
        res.status(500).json({
            sucess: false,
            message: "errro no servidor",
            err: err
        });
    }
};

export const createProduct = async (req, res) => {
    try {
        
        const newProduct = new Product(req.body);
        await Product.create(newProduct);
        const Products = await Product.getAll();
        res.status(201).json({
            sucess: true,
            message: "produto cadastrado com sucesso",
            Products: Products
        });
    } catch (err) {
        res.status(500).json({
            sucess: false,
            message: "errro no servidor",
            err: err.message
        });
    }
};

export const updateProduct = async (req, res) => {
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
        await Product.update(id, req.body);
        const finds = await Product.findById(id);
        res.status(200).json({
            sucess: true,
            message: "produto actualizado",
            Product: finds
        });
    } catch (err) {
        res.status(500).json({
            sucess: false,
            message: "erro ao actualizar o produto ",
            err: err.message
        });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        await Product.Delete(id);
        const Product = await Product.getAll();
        res.status(200).json({
            sucess: true,
            message: "produto apagado",
            Product: Product
        });
    } catch (err) {
        res.status(500).json({
            sucess: false,
            message: "erro ao apagar o produto ",
            err: err.message
        });
    }
};
