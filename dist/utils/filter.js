"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSearchParams = exports.validFilterTypes = exports.filterCards = void 0;
const applyFilter = (cardValue, filterType, searchText) => {
    switch (filterType) {
        case "==":
            return cardValue == searchText;
        case "!=":
            return cardValue != searchText;
        case ">":
            if (typeof cardValue == "number" && typeof searchText == "number") {
                return cardValue > searchText;
            }
            return false;
        case ">=":
            if (typeof cardValue == "number" && typeof searchText == "number") {
                return cardValue >= searchText;
            }
            return false;
        case "<":
            if (typeof cardValue == "number" && typeof searchText == "number") {
                return cardValue < searchText;
            }
            return false;
        case "<=":
            if (typeof cardValue == "number" && typeof searchText == "number") {
                return cardValue <= searchText;
            }
            return false;
        case "includes":
            if (typeof cardValue == "string" && typeof searchText == "string") {
                return cardValue.includes(searchText);
            }
            return false;
        case "notIncludes":
            if (typeof cardValue == "string" && typeof searchText == "string") {
                return !cardValue.includes(searchText);
            }
            return false;
        default:
            return true;
    }
};
const filterCards = (card, filterParams) => {
    let filter = true;
    if (!filterParams.length)
        return filter;
    filterParams.forEach((param) => {
        if (!applyFilter(card[param.fieldName], param.filterType, param.searchValue))
            filter = false;
    });
    return filter;
};
exports.filterCards = filterCards;
exports.validFilterTypes = [
    "==",
    "!=",
    ">",
    ">=",
    "<",
    "<=",
    "includes",
    "notIncludes",
];
const validateSearchParams = (req, res, next) => {
    var _a, _b;
    const searchString = (_b = (_a = req.query.searchParams) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : "[]";
    try {
        const searchParams = JSON.parse(searchString);
        // Validação dos parâmetros
        const isValid = searchParams.every((param) => {
            return ((typeof param.searchValue === "string" ||
                typeof param.searchValue === "number" ||
                typeof param.searchValue === "boolean") &&
                typeof param.fieldName === "string" &&
                exports.validFilterTypes.includes(param.filterType));
        });
        if (!isValid) {
            return res.status(400).json({
                message: "Invalid search parameters provided.",
                error: "Invalid search parameters provided.",
            });
        }
        req.validatedSearchParams = searchParams; // Passa os parâmetros validados para a próxima função
        next();
    }
    catch (error) {
        return res.status(400).json({
            message: "Invalid JSON format for searchParams.",
            error: error.message,
        });
    }
};
exports.validateSearchParams = validateSearchParams;
