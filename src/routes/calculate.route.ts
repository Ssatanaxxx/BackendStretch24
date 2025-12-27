import { Router } from "express";
import { calculatePrice } from "../controllers/calc.controller";
import { createOrder, getOrders } from "../controllers/order.controller";

const router = Router();

router.post("/", calculatePrice);
router.post("/order", createOrder);
router.get("/orders", getOrders); // для отладки

export default router;