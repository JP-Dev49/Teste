import Product from "../models/productsModel.js";
import {
  create,
  getAllProducts,
  updateOne,
  DeleteProduct
} from "../services/productService.js"

export const getAll = async (req, res) => {
  try {
    const Products = await getAllProducts();
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

    await create(req.body);
    const Products = await getAllProducts();
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

    const id = parseInt(req.params.id);
    await updateOne(id, req.body);
    const find = await findById(id);
    res.status(200).json({
      sucess: true,
      message: "produto actualizado",
      Product: find
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
    await DeleteProduct(id);
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
