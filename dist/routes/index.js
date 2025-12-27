"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const services_route_1 = __importDefault(require("./services.route"));
const calculate_route_1 = __importDefault(require("./calculate.route"));
const extras_route_1 = __importDefault(require("./extras.route"));
const health_route_1 = __importDefault(require("./health.route")); // ������ ��� ������!
const router = (0, express_1.Router)();
router.get("/", (req, res) => {
    res.json({
        message: "API ���������� ��������",
        version: "1.0.0",
        endpoints: {
            services: "/api/services",
            extras: "/api/extras",
            calculate: "/api/calculate",
            order: "/api/calculate/order",
            health: "/api/health" // ����� �������� � ������
        }
    });
});
router.use("/services", services_route_1.default);
router.use("/extras", extras_route_1.default);
router.use("/calculate", calculate_route_1.default);
router.use("/health", health_route_1.default); // ������ ��� ������!
exports.default = router;
//# sourceMappingURL=index.js.map