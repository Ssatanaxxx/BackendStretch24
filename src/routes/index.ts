import { Router } from "express";
import servicesRouter from "./services.route";
import calcRouter from "./calculate.route";
import extrasRouter from "./extras.route";
import healthRouter from "./health.route";  // Добавь эту строку!

const router = Router();

router.get("/", (req, res) => {
  res.json({
    message: "API потолочной компании",
    version: "1.0.0",
    endpoints: {
      services: "/api/services",
      extras: "/api/extras",
      calculate: "/api/calculate",
      order: "/api/calculate/order",
      health: "/api/health"  // Можно добавить в список
    }
  });
});

router.use("/services", servicesRouter);
router.use("/extras", extrasRouter);
router.use("/calculate", calcRouter);
router.use("/health", healthRouter);  // Добавь эту строку!

export default router;
