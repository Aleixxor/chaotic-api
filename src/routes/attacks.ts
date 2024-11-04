import express from "express";
import { Attacks } from "../db/models/attack";
import {
  filterCards,
  ISearchParams,
  validateSearchParams,
} from "../utils/filter";
import { ICard } from "./cards";

const router = express.Router();

export const getAttacks = (filterParams: ISearchParams[] = []) => {
  return Attacks.filter((card) => filterCards(card, filterParams)).map(
    (card) => {
      return {
        type: "attack",
        card,
      } as ICard;
    }
  );
};

router.get("/", validateSearchParams, (req: any, res) => {
  res.json(getAttacks(req.validatedSearchParams));
});

router.get("/:set", (req, res) => {
  res.json(
    getAttacks([
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
    getAttacks([
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

export const AttacksRoutes = router;
