import AttacksList from "../json/attacks.json";

//Chaotic Attack Card

//Attack Schema
export interface IAttack {
  name: string;
  set: string;
  rarity: string;
  id: number;
  bp: number;
  base: number;
  fire: number;
  air: number;
  earth: number;
  water: number;
  ability: string;
  flavorText: string;
  unique: boolean;
  artist: string;
}

export const Attacks = AttacksList as IAttack[];
