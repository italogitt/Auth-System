import jwt from "jsonwebtoken"

export const jwtValidation = async (req, res, next) => {
    const authHeader = req.headers.authorization


    if (!authHeader) {
        return res.status(401).json({
            message: "Access denied. No token provided."
        })
    }

    const token = authHeader.split(" ")[1]

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.userId = decoded.id

        return next()
    } catch (error) {
        console.error(error)

        return res.status(401).json({
            error: "Invalid token"
        })
    }
}
