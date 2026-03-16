import { Prisma, PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default prisma

export const createUser = async (req, res) => {
    const { userName, userEmail } = req.body

    const newUser = await prisma.user.create({
        data:{
            userName: userName,
            userEmail: userEmail
        }
    })

    return res.status(201).json({
        message: "User successfully created",
        user: newUser
    })
}

export const getAllUsers = async (req, res) => {
    const users = await prisma.user.findMany()

    return res.status(200).json(users)
}

export const getUserById = async (req, res) => {
    const userFound = await prisma.user.findUnique({
        where: {
            id: req.params.id
        }
    })

    if (userFound) {
        return res.status(200).json({ user: userFound })
    } else {
        return res.status(404).json({ message: "User not found" })
    }
}

export const updateUser = async (req, res) => {
    const id = req.params.id
    const { userName, userEmail } = req.body

    const userFound = await prisma.user.findUnique({
        where: {
            id: id
        }
    })

    if (userFound) {
        await prisma.user.update({
            where: {
                id: id
            }
        })
        return res.status(200).json({
            message: "User successfully updated",
            user: usersArray[userFoundIndex]
        })
    } else {
        return res.status(404).json({ message: "User not found" })
    }
}

export const deleteUser = async (req, res) => {
    const id = req.params.id

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
}