import express from "express"
import { createUser, getAllUsers, getUserById, deleteUser, updateUser, login } from "../controllers/userController.js"
import { validateUser } from "../middlewares/userValidataion.js"

const router = express.Router()

router.post("/", validateUser, createUser)
router.get("/", getAllUsers)
router.get("/:id", getUserById)
router.delete("/:id", deleteUser)
router.put("/:id",validateUser, updateUser)
router.post("/login", login)

export default router