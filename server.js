import express from "express"
import userRoutes from "./src/routes/userRoutes.js"

const app = express()

app.use(express.json())

app.get("/", (req, res) => {
    res.send("API running")
})

app.use("/api/users", userRoutes)

app.listen(1000, () => {
    console.log("Server running on port 1000")
})
