import BattlegearsList from "../json/battlegears.json";

//Chaotic Battlegear Card

//Battlegear Schema
export interface IBattlegear {
  name: string;
  set: string;
  rarity: string;
  id: number;
  ability: string;
  flavorText: string;
  unique: boolean;
  loyal: string;
  legendary: boolean;
  past: boolean;
  shard: boolean;
  artist: string;
}

export const Battlegears = BattlegearsList as IBattlegear[];
