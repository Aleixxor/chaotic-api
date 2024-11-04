import express from "express";
import { Battlegears } from "../db/models/battlegear";
import {
  filterCards,
  ISearchParams,
  validateSearchParams,
} from "../utils/filter";
import { ICard } from "./cards";

const router = express.Router();

export const getBattlegears = (filterParams: ISearchParams[] = []) => {
  return Battlegears.filter((card) => filterCards(card, filterParams)).map(
    (card) => {
      return {
        type: "battlegear",
        card,
      } as ICard;
    }
  );
};

router.get("/", validateSearchParams, (req: any, res) => {
  res.json(getBattlegears(req.validatedSearchParams));
});

router.get("/:set", (req, res) => {
  res.json(
    getBattlegears([
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
    getBattlegears([
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

export const BattlegearsRoutes = router;
