import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import helmet from "helmet";
import morgan from "morgan";
import fs from 'fs';
import path from 'path';
import router from "./routes";

const app = express();

// SECURITY
app.use(helmet());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
  })
);

// MIDDLEWARE
app.use(bodyParser.json({ limit: "1mb" }));
app.use(morgan("dev"));

// ROUTES
app.use("/api", router);

// ERROR HANDLER
app.use((err: any, req: any, res: any, next: any) => {
  const logDir = path.join(__dirname, '../logs');
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }
  
  const errorLog = `[${new Date().toISOString()}] ERROR
  URL: ${req.url}
  Method: ${req.method}
  Error: ${err.message}
  Stack: ${err.stack}
  Body: ${JSON.stringify(req.body)}
  ==========================================\n`;
  
  fs.appendFileSync(path.join(logDir, 'errors.log'), errorLog, 'utf8');
  
  console.error('Server Error:', err.message);
  res.status(500).json({ 
    success: false,
    error: "Внутренняя ошибка сервера" 
  });
});

export default app;
