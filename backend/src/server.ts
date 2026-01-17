import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import optionRoutes from "./routes/option.routes";

dotenv.config();

const app = express();

/* ---------- MIDDLEWARE ---------- */
app.use(cors());
app.use(express.json());

/* ---------- ROOT TEST ---------- */
app.get("/", (req, res) => {
  res.send("Backend is running");
});

/* ---------- API ROUTES ---------- */
app.use("/api/option", optionRoutes);

/* ---------- PORT (CRITICAL) ---------- */
const PORT = Number(process.env.PORT) || 4000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});
