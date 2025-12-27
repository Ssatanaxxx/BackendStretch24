"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const extras_controller_1 = require("../controllers/extras.controller");
const router = (0, express_1.Router)();
router.get("/", extras_controller_1.getExtras);
exports.default = router;
//# sourceMappingURL=extras.route.js.map