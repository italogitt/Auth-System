import express from "express"
import { createUser, getAllUsers, getUserById, deleteUser, updateUser, login } from "../controllers/userController.js"
import { validateUser, validateUpdateUser } from "../middlewares/userValidataion.js"
import { jwtValidation } from "../middlewares/authMiddleware.js"

const router = express.Router()

router.post("/", validateUser, createUser)
router.get("/",jwtValidation, getAllUsers)
router.get("/profile", jwtValidation, getUserById)
router.delete("/profile", jwtValidation, deleteUser)
router.put("/profile", jwtValidation ,validateUpdateUser, updateUser)
router.post("/login", login)

export default router