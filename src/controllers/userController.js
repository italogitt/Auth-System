import { Prisma, PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const prisma = new PrismaClient()

export default prisma

export const createUser = async (req, res) => {
    try {
        const { userName, userEmail, password } = req.body

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = await prisma.user.create({
            data: {
                userName: userName,
                userEmail: userEmail,
                password: hashedPassword
            }
        })

        return res.status(201).json({
            message: "User successfully created",
            user: {
                id: newUser.id,
                userName: newUser.userName,
                userEmail: newUser.userEmail
            }
        })
    } catch (error) {
        console.error(error)

        return res.status(400).json({
            error: "Error creating user. The email address provided may already be in use."
        })
    }
}

export const getAllUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                userName: true,
                userEmail: true
            }
        })

        return res.status(200).json(users)
    } catch (error) {
        console.error(error)

        return res.status(500).json({
            error: "Internal server error."
        })
    }
}

export const getUserById = async (req, res) => {
    try {
        const userFound = await prisma.user.findUnique({
            where: {
                id: req.userId
            },
            select: {
                id: true,
                userName: true,
                userEmail: true
            }
        })

        if (userFound) {
            return res.status(200).json({ user: userFound })
        } else {
            return res.status(404).json({ message: "User not found" })
        }
    } catch (error) {
        console.error(error)

        return res.status(500).json({
            error: "Internal server error"
        })
    }
}

export const updateUser = async (req, res) => {
    try {
        const id = req.userId
        const { userName, userEmail } = req.body

        const userFound = await prisma.user.findUnique({
            where: {
                id: id
            }
        })

        if (userFound) {
            const updatedUser = await prisma.user.update({
                where: {
                    id: id
                },
                data: {
                    userName: userName,
                    userEmail: userEmail
                },
                select: {
                    id: true,
                    userName: true,
                    userEmail: true
                }
            })

            return res.status(200).json({
                message: "User successfully updated",
                user: updatedUser
            })
        } else {
            return res.status(404).json({ message: "User not found" })
        }
    } catch (error) {
        console.error(error)

        return res.status(500).json({
            error: "Internal server error."
        })
    }
}

export const deleteUser = async (req, res) => {
    try {
        const id = req.userId

        const userFound = await prisma.user.findUnique({
            where: {
                id: id
            }
        })

        if (userFound) {
            await prisma.user.delete({
                where: {
                    id: id
                }
            })
            return res.status(200).json({ message: "User deleted successfully" })
        } else {
            return res.status(404).json({ message: "User not found" })
        }
    } catch (error) {
        console.error(error)

        return res.status(500).json({
            error: "Internal server error."
        })
    }
}

export const login = async (req, res) => {
    try {
        const { userEmail, password } = req.body

        const userFound = await prisma.user.findUnique({
            where: {
                userEmail: userEmail
            }
        })

        if (!userFound) {
            return res.status(404).json({ error: "Invalid e-mail or password" })
        }

        const isPasswordValid = await bcrypt.compare(req.body.password, userFound.password)

        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid e-mail or password" })
        }

        const token = jwt.sign(
            { id: userFound.id },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        )

        return res.status(200).json({
            message: "Login successful!",
            token: token
        })

    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: "Internal server error." })
    }
}