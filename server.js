import express from "express"

const app = express()

app.use(express.json())

app.get("/", (req, res) => {
    res,send("API running")
})

app.listen(1000, () => {
    console.log("Server running on port 1000")
})
