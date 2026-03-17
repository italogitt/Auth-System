import express from "express"
import { createUser, getAllUsers, getUserById, deleteUser, updateUser, login } from "../controllers/userController.js"
import { validateUser, validateUpdateUser } from "../middlewares/userValidataion.js"
import { jwtValidation } from "../middlewares/authMiddleware.js"

const router = express.Router()

router.post("/", validateUser, createUser)
router.get("/",jwtValidation, getAllUsers)
router.get("/:id", jwtValidation, getUserById)
router.delete("/:id", jwtValidation, deleteUser)
router.put("/:id",validateUpdateUser, jwtValidation, updateUser)
router.post("/login", login)

export default router