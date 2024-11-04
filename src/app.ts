import express from "express";
import { CardsRoutes } from "./routes/cards";
import { CreaturesRoutes } from "./routes/creatures";
import { AttacksRoutes } from "./routes/attacks";
import { BattlegearsRoutes } from "./routes/battlegear";
import { LocationsRoutes } from "./routes/locations";
import { MugicsRoutes } from "./routes/mugic";

// Server
const path = require("path");
const app = express();

// Routes
app.get("/", (req, res) => {
  res.send("Chaotic API");
});
app.use("/api/cards", CardsRoutes);
app.use("/api/creatures", CreaturesRoutes);
app.use("/api/attacks", AttacksRoutes);
app.use("/api/battlegear", BattlegearsRoutes);
app.use("/api/locations", LocationsRoutes);
app.use("/api/mugics", MugicsRoutes);

// Card Images
app.get("/api/images/:set/:id", (req, res) => {
  const { set, id } = req.params;
  const img = path.join(__dirname, "..", "assets", set, `${id}.png`);

  res.sendFile(img);
});

export default app;
