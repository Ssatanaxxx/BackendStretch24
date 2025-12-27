import { Router } from "express";
import { getServices } from "../controllers/services.controller";

const router = Router();


// GET /api/services
router.get("/", getServices);

export default router;
