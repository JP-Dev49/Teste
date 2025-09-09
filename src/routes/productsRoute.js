import { Router } from "express";
import { validiteShemaProduct } from "../utils/validationSchema.js";
import { getAll,createProduct,updateProduct,deleteProduct} from "../controllers/productsController.js";

const router = Router();

router.post('/',validiteShemaProduct,createProduct)
router.get("/", getAll);
router.put("/:id",updateProduct);
router.delete("/:id",deleteProduct)

export default router;
