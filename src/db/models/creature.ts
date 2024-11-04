import CreaturesList from "../json/creatures.json";

//Chaotic Creature Card

//Creature Schema

export interface ICreature {
  name: string;
  set: string;
  rarity: string;
  id: number;
  tribe: string;
  courage: number;
  power: number;
  wisdom: number;
  speed: number;
  energy: number;
  mugic: number;
  air: boolean;
  earth: boolean;
  fire: boolean;
  water: boolean;
  types: string;
  ability: string;
  flavorText: string;
  brainwashed: string;
  unique: boolean;
  loyal: boolean;
  legendary: boolean;
  artist: string;
  gender: string;
}

export const Creatures = CreaturesList as ICreature[];
