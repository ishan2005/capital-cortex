import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import optionRoutes from "./routes/option.routes";

dotenv.config();

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// health check (VERY IMPORTANT)
app.get("/", (_req, res) => {
  res.send("Capital Cortex Backend Running");
});

// routes
app.use("/api/option", optionRoutes);

// PORT — Railway injects this
const PORT = Number(process.env.PORT) || 4000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});
