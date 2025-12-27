"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const services_controller_1 = require("../controllers/services.controller");
const router = (0, express_1.Router)();
// GET /api/services
router.get("/", services_controller_1.getServices);
exports.default = router;
//# sourceMappingURL=services.route.js.map