import express from "express"
import cors from "cors"
import dotenv from "dotenv"

import optionRoutes from "./routes/option.routes"

dotenv.config()

const app = express()
app.get("/", (req, res) => {
  res.send("Capital Cortex Backend is running 🚀");
});

app.use(cors())
app.use(express.json())

app.use("/api/option", optionRoutes)

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`)
})
