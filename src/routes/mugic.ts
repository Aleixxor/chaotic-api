import express from "express";
import { Mugics } from "../db/models/mugic";
import {
  filterCards,
  ISearchParams,
  validateSearchParams,
} from "../utils/filter";
import { ICard } from "./cards";

const router = express.Router();

export const getMugics = (filterParams: ISearchParams[] = []) => {
  return Mugics.filter((card) => filterCards(card, filterParams)).map(
    (card) => {
      return {
        type: "mugic",
        card,
      } as ICard;
    }
  );
};

router.get("/", validateSearchParams, (req: any, res) => {
  res.json(getMugics(req.validatedSearchParams));
});

router.get("/:set", (req, res) => {
  res.json(
    getMugics([
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
    getMugics([
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

export const MugicsRoutes = router;
