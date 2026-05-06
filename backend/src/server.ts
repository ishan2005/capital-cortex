import "dotenv/config";
import express from "express";
import cors from "cors";
import optionRoutes from "./routes/option.routes";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
  res.send("Capital Cortex Backend Running");
});

app.get("/api/option/health", (_, res) => {
  res.json({ status: "ok" });
});

app.use("/api/option", optionRoutes);

const PORT = Number(process.env.PORT) || 4000;
app.listen(PORT, "0.0.0.0", () =>
  console.log(`Backend running on ${PORT}`)
);
