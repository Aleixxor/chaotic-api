import express from "express";
import { Creatures } from "../db/models/creature";
import {
  filterCards,
  ISearchParams,
  validateSearchParams,
} from "../utils/filter";
import { ICard } from "./cards";

const router = express.Router();

export const getCreatures = (filterParams: ISearchParams[] = []) => {
  return Creatures.filter((card) => filterCards(card, filterParams)).map(
    (card) => {
      return {
        type: "creature",
        card,
      } as ICard;
    }
  );
};

router.get("/", validateSearchParams, (req: any, res) => {
  res.json(getCreatures(req.validatedSearchParams));
});

router.get("/:set", (req, res) => {
  res.json(
    getCreatures([
      {
        fieldName: "set",
        filterType: "==",
        searchValue: req.params.set,
      },
    ])
  );
});

router.get("/:set/:id", (req, res) => {
  res.json(
    getCreatures([
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
    ])
  );
});

export const CreaturesRoutes = router;
