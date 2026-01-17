"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const option_routes_1 = __importDefault(require("./routes/option.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
/* ---------- MIDDLEWARE ---------- */
app.use((0, cors_1.default)());
app.use(express_1.default.json());
/* ---------- ROOT TEST ---------- */
app.get("/", (req, res) => {
    res.send("Backend is running");
});
/* ---------- API ROUTES ---------- */
app.use("/api/option", option_routes_1.default);
/* ---------- PORT (CRITICAL) ---------- */
const PORT = Number(process.env.PORT) || 4000;
app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Backend running on port ${PORT}`);
});
