"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cards_1 = require("./routes/cards");
const creatures_1 = require("./routes/creatures");
const attacks_1 = require("./routes/attacks");
const battlegear_1 = require("./routes/battlegear");
const locations_1 = require("./routes/locations");
const mugic_1 = require("./routes/mugic");
// Server
const port = process.env.PORT || 3000;
const path = require("path");
const app = (0, express_1.default)();
// Routes
app.get("/", (req, res) => {
    res.send("Chaotic API");
});
app.use("/api/cards", cards_1.CardsRoutes);
app.use("/api/creatures", creatures_1.CreaturesRoutes);
app.use("/api/attacks", attacks_1.AttacksRoutes);
app.use("/api/battlegear", battlegear_1.BattlegearsRoutes);
app.use("/api/locations", locations_1.LocationsRoutes);
app.use("/api/mugics", mugic_1.MugicsRoutes);
// Card Images
app.get("/api/images/:set/:id", (req, res) => {
    const { set, id } = req.params;
    const img = path.join(__dirname, "..", "assets", set, `${id}.png`);
    res.sendFile(img);
});
app.listen(port, () => console.log(`Chaotic API Server running on ${port}`));
