import { Router } from "express";
const router = Router();
import {register, login, logout} from "../controller/authControllers.js"
import { validateRegisterInput, validateLoginInput } from "../middleware/validationMiddleware.js";
import upload from "../middleware/multerMiddlewre.js";



router.post("/register",validateRegisterInput,upload.single("avatar"), register);
router.post("/login",validateLoginInput, login);
router.get("/logout", logout);

export default router;