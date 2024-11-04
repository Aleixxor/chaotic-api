"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationsRoutes = exports.getLocations = void 0;
const express_1 = __importDefault(require("express"));
const location_1 = require("../db/models/location");
const filter_1 = require("../utils/filter");
const router = express_1.default.Router();
const getLocations = (filterParams = []) => {
    return location_1.Locations.filter((card) => (0, filter_1.filterCards)(card, filterParams)).map((card) => {
        return {
            type: "location",
            card,
        };
    });
};
exports.getLocations = getLocations;
router.get("/", filter_1.validateSearchParams, (req, res) => {
    res.json((0, exports.getLocations)(req.validatedSearchParams));
});
router.get("/:set", (req, res) => {
    res.json((0, exports.getLocations)([
        {
            fieldName: "set",
            filterType: "==",
            searchValue: req.params.set,
        },
    ]));
});
router.get("/:set/:id", (req, res) => {
    res.json((0, exports.getLocations)([
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
exports.LocationsRoutes = router;
