"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExtras = void 0;
const extras_1 = __importDefault(require("../data/extras"));
const getExtras = (req, res) => {
    res.json(extras_1.default);
};
exports.getExtras = getExtras;
//# sourceMappingURL=extras.controller.js.map