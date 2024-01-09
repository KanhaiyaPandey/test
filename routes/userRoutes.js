import { Router } from "express";
import { deleteUser, getAllUsers, getCurrentUser, updateUser } from "../controller/userControllers.js";
import upload from "../middleware/multerMiddlewre.js"
const router = Router();

router.get("/current-user", getCurrentUser);
router.get("/all-users",getAllUsers);
router.patch("/update-user/:id",upload.single("avatar"),updateUser);
router.delete("/delete-user/:id",deleteUser);

export default router;