import MugicsList from "../json/mugics.json";

//Chaotic Mugic Card

//Mugic Schema
export interface IMugic {
  name: string;
  set: string;
  rarity: string;
  id: number;
  tribe: string;
  cost: number;
  ability: string;
  flavorText: string;
  unique: boolean;
  past: string;
  artist: string;
}

export const Mugics = MugicsList as IMugic[];
