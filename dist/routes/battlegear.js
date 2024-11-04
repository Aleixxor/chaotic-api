"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BattlegearsRoutes = exports.getBattlegears = void 0;
const express_1 = __importDefault(require("express"));
const battlegear_1 = require("../db/models/battlegear");
const filter_1 = require("../utils/filter");
const router = express_1.default.Router();
const getBattlegears = (filterParams = []) => {
    return battlegear_1.Battlegears.filter((card) => (0, filter_1.filterCards)(card, filterParams)).map((card) => {
        return {
            type: "battlegear",
            card,
        };
    });
};
exports.getBattlegears = getBattlegears;
router.get("/", filter_1.validateSearchParams, (req, res) => {
    res.json((0, exports.getBattlegears)(req.validatedSearchParams));
});
router.get("/:set", (req, res) => {
    res.json((0, exports.getBattlegears)([
        {
            fieldName: "set",
            filterType: "==",
            searchValue: req.params.set,
        },
    ]));
});
router.get("/:set/:id", (req, res) => {
    res.json((0, exports.getBattlegears)([
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
exports.BattlegearsRoutes = router;
