import { Router } from "express";
import { validiteShemaUser } from "../middleware/validationSchema.js";
import { getAll,createUser,updateUser ,deleteUser,login} from "../controllers/usersController.js";
import {authUser} from '../middleware/auth.user.js'

const router = Router();

router.post('/',validiteShemaUser,createUser)
router.get("/", getAll);
router.put("/:id",updateUser);
router.delete("/:id",deleteUser)
router.post('/login',authUser,login)
export default router;
