import express from "express";
import { IAttack } from "../db/models/attack";
import { IBattlegear } from "../db/models/battlegear";
import { ICreature } from "../db/models/creature";
import { ILocation } from "../db/models/location";
import { IMugic } from "../db/models/mugic";
import { ISearchParams, validateSearchParams } from "../utils/filter";
import { getAttacks } from "./attacks";
import { getBattlegears } from "./battlegear";
import { getCreatures } from "./creatures";
import { getLocations } from "./locations";
import { getMugics } from "./mugic";
const router = express.Router();

export interface ICard {
  type: "attack" | "battlegear" | "creature" | "location" | "mugic";
  card: IAttack | IBattlegear | ICreature | ILocation | IMugic;
}

const getCards = (filterParams: ISearchParams[] = []) => {
  let cards: ICard[] = [];

  let cardType = filterParams.find((_) => _.fieldName == "type")?.fieldName;

  switch (cardType) {
    case "attack":
      return getAttacks(filterParams);
    case "battlegear":
      return getBattlegears(filterParams);
    case "creature":
      return getCreatures(filterParams);
    case "location":
      return getLocations(filterParams);
    case "mugic":
      return getMugics(filterParams);
    default:
      return cards
        .concat(getAttacks(filterParams))
        .concat(getBattlegears(filterParams))
        .concat(getCreatures(filterParams))
        .concat(getLocations(filterParams))
        .concat(getMugics(filterParams));
  }
};

// Returns all cards
router.get("/", validateSearchParams, (req: any, res) => {
  res.json(getCards(req.validatedSearchParams));
});

// Returns all cards from set
router.get("/:set", (req, res) => {
  res.json(
    getCards([
      {
        fieldName: "set",
        filterType: "==",
        searchValue: req.params.set,
      },
    ])
  );
});

// Returns all cards from set
router.get("/:set/:id", (req, res) => {
  res.json(
    getCards([
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
    ])
  );
});

export const CardsRoutes = router;
