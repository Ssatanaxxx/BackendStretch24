import { Router } from "express";
import { getExtras } from "../controllers/extras.controller";

const router = Router();

router.get("/", getExtras);

export default router;