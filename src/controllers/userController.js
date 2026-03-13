import { v4 as uuidv4 } from "uuid"

const usersArray = []

export const createUser = (req, res) => {
    const { userName, userEmail } = req.body

    const user = { id: uuidv4(), userName, userEmail }

    usersArray.push(user)

    return res.status(201).json({
        message: "User successfully created",
        user: user
    })
}

export const getAllUsers = (req, res) => {
    return res.status(200).json({ users: usersArray })
}

export const getUserById = (req, res) => {
    const id = req.params.id
    const userFound = usersArray.find(user => user.id === id)

    if (userFound) {
        return res.status(200).json({ user: userFound })
    } else {
        return res.status(404).json({ message: "User not found" })
    }
}

export const deleteUser = (req, res) => {
    const id = req.params.id
    const userFoundIndex = usersArray.findIndex(user => user.id === id)

    if (userFoundIndex >= 0) {
        usersArray.splice(userFoundIndex, 1)
        return res.status(200).json({ message: "User deleted successfully" })
    } else { 
        return res.status(404).json({ message: "User not found" })
    }
}

export const updateUser = (req, res) => {
    const id = req.params.id
    const { userName, userEmail } = req.body
    const userFoundIndex = usersArray.findIndex(user => user.id === id)

    if (userFoundIndex >= 0){
        usersArray[userFoundIndex].userName = userName
        usersArray[userFoundIndex].userEmail= userEmail
        return res.status(200).json({ 
            message: "User successfully updated", 
            user: usersArray[userFoundIndex]
        })
    } else {
        return res.status(404).json({ message: "User not found" })
    }
}