"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreaturesRoutes = exports.getCreatures = void 0;
const express_1 = __importDefault(require("express"));
const creature_1 = require("../db/models/creature");
const filter_1 = require("../utils/filter");
const router = express_1.default.Router();
const getCreatures = (filterParams = []) => {
    return creature_1.Creatures.filter((card) => (0, filter_1.filterCards)(card, filterParams)).map((card) => {
        return {
            type: "creature",
            card,
        };
    });
};
exports.getCreatures = getCreatures;
router.get("/", filter_1.validateSearchParams, (req, res) => {
    res.json((0, exports.getCreatures)(req.validatedSearchParams));
});
router.get("/:set", (req, res) => {
    res.json((0, exports.getCreatures)([
        {
            fieldName: "set",
            filterType: "==",
            searchValue: req.params.set,
        },
    ]));
});
router.get("/:set/:id", (req, res) => {
    res.json((0, exports.getCreatures)([
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
exports.CreaturesRoutes = router;
