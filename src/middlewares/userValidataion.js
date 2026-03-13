export const validateUser = (req, res, next) => {
    const userName = req.body.userName
    const userEmail = req.body.userEmail

    if (!userName || !userEmail){
        return res.status(400).json({
            message: "Name and email are required"
        })
    }

    return next()
}