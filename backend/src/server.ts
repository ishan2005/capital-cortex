import dotenv from "dotenv"
dotenv.config()

import express from "express"
import cors from "cors"


import optionRoutes from "./routes/option.routes"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/option", optionRoutes)

const PORT = 4000

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`)
})
