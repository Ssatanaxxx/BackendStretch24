"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const calc_controller_1 = require("../controllers/calc.controller");
const order_controller_1 = require("../controllers/order.controller");
const router = (0, express_1.Router)();
router.post("/", calc_controller_1.calculatePrice);
router.post("/order", order_controller_1.createOrder);
router.get("/orders", order_controller_1.getOrders); // для отладки
exports.default = router;
//# sourceMappingURL=calculate.route.js.map