import { Router } from "express";
import { validiteShemaUser } from "../utils/validationSchema.js";
import { getAll, createUser, updateUser, deleteUser, login } from "../controllers/usersController.js";
import { authUser } from '../middleware/auth.user.js'
import { getAllOrders,getAllOrdersUser } from '../controllers/orderController.js'

const router = Router();

router.post('/', validiteShemaUser, createUser)
router.get("/", getAll);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser)
router.post('/login', authUser, login)
router.get('/order', getAllOrders)
router.get('/:id/order', getAllOrdersUser)
export default router;
