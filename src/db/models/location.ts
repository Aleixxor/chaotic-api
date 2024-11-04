import LocationsList from "../json/locations.json";

//Chaotic Location Card

//Location Schema
export interface ILocation {
  name: string;
  set: string;
  rarity: string;
  id: number;
  initiative: string;
  ability: string;
  flavorText: string;
  unique: boolean;
  mirage: boolean;
  past: boolean;
  artist: string;
}

export const Locations = LocationsList as ILocation[];
