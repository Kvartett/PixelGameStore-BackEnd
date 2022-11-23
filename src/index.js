import express from "express"
import cors from "cors"
import signRoutes from "./routes/sign.routes.js"

const app = express()

app.use(cors())
app.use(express.json())
app.use(signRoutes)

app.listen(5000, () => console.log("Server running at Port: 5000"))