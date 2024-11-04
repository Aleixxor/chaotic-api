import { NextFunction } from "express";

export interface ISearchParams {
  searchValue: string | number | boolean;
  fieldName: string;
  filterType:
    | "=="
    | "!="
    | ">"
    | ">="
    | "<"
    | "<="
    | "includes"
    | "notIncludes";
}

const applyFilter = (
  cardValue: string | number | boolean,
  filterType: string,
  searchText: string | number | boolean
) => {
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

export const filterCards = (card: any, filterParams: ISearchParams[]) => {
  let filter = true;
  if (!filterParams.length) return filter;

  filterParams.forEach((param) => {
    if (
      !applyFilter(card[param.fieldName], param.filterType, param.searchValue)
    )
      filter = false;
  });
  return filter;
};

export const validFilterTypes = [
  "==",
  "!=",
  ">",
  ">=",
  "<",
  "<=",
  "includes",
  "notIncludes",
];

export const validateSearchParams = (
  req: any,
  res: any,
  next: NextFunction
) => {
  const searchString = req.query.searchParams?.toString() ?? "[]";

  try {
    const searchParams = JSON.parse(searchString) as ISearchParams[];
    // Validação dos parâmetros
    const isValid = searchParams.every((param) => {
      return (
        (typeof param.searchValue === "string" ||
          typeof param.searchValue === "number" ||
          typeof param.searchValue === "boolean") &&
        typeof param.fieldName === "string" &&
        validFilterTypes.includes(param.filterType)
      );
    });

    if (!isValid) {
      return res.status(400).json({
        message: "Invalid search parameters provided.",
        error: "Invalid search parameters provided.",
      });
    }

    req.validatedSearchParams = searchParams; // Passa os parâmetros validados para a próxima função
    next();
  } catch (error: any) {
    return res.status(400).json({
      message: "Invalid JSON format for searchParams.",
      error: error.message,
    });
  }
};
