"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
// SECURITY
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({
    origin: "*",
    methods: ["GET", "POST"],
}));
// MIDDLEWARE
app.use(body_parser_1.default.json({ limit: "1mb" }));
app.use((0, morgan_1.default)("dev"));
// ROUTES
app.use("/api", routes_1.default);
// ERROR HANDLER
app.use((err, req, res, next) => {
    const logDir = path_1.default.join(__dirname, '../logs');
    if (!fs_1.default.existsSync(logDir)) {
        fs_1.default.mkdirSync(logDir, { recursive: true });
    }
    const errorLog = `[${new Date().toISOString()}] ERROR
  URL: ${req.url}
  Method: ${req.method}
  Error: ${err.message}
  Stack: ${err.stack}
  Body: ${JSON.stringify(req.body)}
  ==========================================\n`;
    fs_1.default.appendFileSync(path_1.default.join(logDir, 'errors.log'), errorLog, 'utf8');
    console.error('Server Error:', err.message);
    res.status(500).json({
        success: false,
        error: "Внутренняя ошибка сервера"
    });
});
exports.default = app;
//# sourceMappingURL=app.js.map