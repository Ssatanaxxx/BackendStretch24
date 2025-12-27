"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getServices = void 0;
const services_1 = __importDefault(require("../data/services"));
const getServices = (req, res) => {
    res.json(services_1.default);
};
exports.getServices = getServices;
//# sourceMappingURL=services.controller.js.map