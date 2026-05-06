"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const option_routes_1 = __importDefault(require("./routes/option.routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/", (_, res) => {
    res.send("Capital Cortex Backend Running");
});
app.get("/api/option/health", (_, res) => {
    res.json({ status: "ok" });
});
app.use("/api/option", option_routes_1.default);
const PORT = Number(process.env.PORT) || 4000;
app.listen(PORT, "0.0.0.0", () => console.log(`Backend running on ${PORT}`));
