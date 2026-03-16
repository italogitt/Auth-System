import { Prisma, PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default prisma

export const createUser = async (req, res) => {
    try{
    const { userName, userEmail } = req.body

    const newUser = await prisma.user.create({
        data: {
            userName: userName,
            userEmail: userEmail
        }
    })

    return res.status(201).json({
        message: "User successfully created",
        user: newUser
    })
    } catch (error) {
        console.error(error)

        return res.status(400).json({
            error: "Error creating user. The email address provided may already be in use."
        })
    }
} 

export const getAllUsers = async (req, res) => {
    try{
    const users = await prisma.user.findMany()

    return res.status(200).json(users)
    } catch (error) {
        console.error(error)

        return res.status(500).json({ 
            error: "Internal server error." 
        })
    }
}

export const getUserById = async (req, res) => {
    try{
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
    } catch (error) {
        console.error(error)

        return res.status.json(500)({
            error: "Internal server error"
        })
    }
}

export const updateUser = async (req, res) => {
    try{
    const id = req.params.id
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
    try{
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
    }} catch (error){
        console.error(error)
        return res.status(500).json({
            error: "Internal server error."
        })
    }
}