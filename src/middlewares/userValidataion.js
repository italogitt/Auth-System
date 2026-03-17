export const validateUser = (req, res, next) => {
    const userName = req.body.userName
    const userEmail = req.body.userEmail
    const password = req.body.password

    if (!userName || !userEmail || !password){
        return res.status(400).json({
            message: "Name, email and password are required to create the user"
        })
    }

    return next()
}

export const validateUpdateUser = (req, res, next) => {
    const userName = req.body.userName
    const userEmail = req.body.userEmail

    if (!userName || !userEmail){
        return res.status(400).json({
            message: "Name and email are required to uptdate the user"
        })
    }

    return next()
}