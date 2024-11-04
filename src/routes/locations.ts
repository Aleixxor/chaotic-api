import express from "express";
import { Locations } from "../db/models/location";
import {
  filterCards,
  ISearchParams,
  validateSearchParams,
} from "../utils/filter";
import { ICard } from "./cards";

const router = express.Router();

export const getLocations = (filterParams: ISearchParams[] = []) => {
  return Locations.filter((card) => filterCards(card, filterParams)).map(
    (card) => {
      return {
        type: "location",
        card,
      } as ICard;
    }
  );
};

router.get("/", validateSearchParams, (req: any, res) => {
  res.json(getLocations(req.validatedSearchParams));
});

router.get("/:set", (req, res) => {
  res.json(
    getLocations([
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
    getLocations([
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

export const LocationsRoutes = router;
