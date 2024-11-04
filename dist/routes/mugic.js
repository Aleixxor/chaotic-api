"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MugicsRoutes = exports.getMugics = void 0;
const express_1 = __importDefault(require("express"));
const mugic_1 = require("../db/models/mugic");
const filter_1 = require("../utils/filter");
const router = express_1.default.Router();
const getMugics = (filterParams = []) => {
    return mugic_1.Mugics.filter((card) => (0, filter_1.filterCards)(card, filterParams)).map((card) => {
        return {
            type: "mugic",
            card,
        };
    });
};
exports.getMugics = getMugics;
router.get("/", filter_1.validateSearchParams, (req, res) => {
    res.json((0, exports.getMugics)(req.validatedSearchParams));
});
router.get("/:set", (req, res) => {
    res.json((0, exports.getMugics)([
        {
            fieldName: "set",
            filterType: "==",
            searchValue: req.params.set,
        },
    ]));
});
router.get("/:set/:id", (req, res) => {
    res.json((0, exports.getMugics)([
        {
            fieldName: "set",
            filterType: "==",
            searchValue: req.params.set,
        },
        {
            fieldName: "id",
            filterType: "==",
            searchValue: parseInt(req.params.id),
        },
    ]));
});
exports.MugicsRoutes = router;
