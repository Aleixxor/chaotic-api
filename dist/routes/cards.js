"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardsRoutes = void 0;
const express_1 = __importDefault(require("express"));
const filter_1 = require("../utils/filter");
const attacks_1 = require("./attacks");
const battlegear_1 = require("./battlegear");
const creatures_1 = require("./creatures");
const locations_1 = require("./locations");
const mugic_1 = require("./mugic");
const router = express_1.default.Router();
const getCards = (filterParams = []) => {
    var _a;
    let cards = [];
    let cardType = (_a = filterParams.find((_) => _.fieldName == "type")) === null || _a === void 0 ? void 0 : _a.fieldName;
    switch (cardType) {
        case "attack":
            return (0, attacks_1.getAttacks)(filterParams);
        case "battlegear":
            return (0, battlegear_1.getBattlegears)(filterParams);
        case "creature":
            return (0, creatures_1.getCreatures)(filterParams);
        case "location":
            return (0, locations_1.getLocations)(filterParams);
        case "mugic":
            return (0, mugic_1.getMugics)(filterParams);
        default:
            return cards
                .concat((0, attacks_1.getAttacks)(filterParams))
                .concat((0, battlegear_1.getBattlegears)(filterParams))
                .concat((0, creatures_1.getCreatures)(filterParams))
                .concat((0, locations_1.getLocations)(filterParams))
                .concat((0, mugic_1.getMugics)(filterParams));
    }
};
// Returns all cards
router.get("/", filter_1.validateSearchParams, (req, res) => {
    res.json(getCards(req.validatedSearchParams));
});
// Returns all cards from set
router.get("/:set", (req, res) => {
    res.json(getCards([
        {
            fieldName: "set",
            filterType: "==",
            searchValue: req.params.set,
        },
    ]));
});
// Returns all cards from set
router.get("/:set/:id", (req, res) => {
    res.json(getCards([
        {
            fieldName: "set",
            filterType: "==",
            searchValue: req.params.set,
        },
        {
            fieldName: "id",
            filterType: "==",
            searchValue: req.params.id,
        },
    ]));
});
exports.CardsRoutes = router;
