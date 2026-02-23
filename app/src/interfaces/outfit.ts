import { Clothe } from "./clothe";

export interface NewOutfit {
  clothes: string[];
  colorScheme?: string;
  rating?: number;
  notes?: string;
  type: string;
}

export interface Outfit {
  id: string;
  clothes: { clothe: Clothe }[];
  colorScheme?: string;
  rating?: number;
  notes?: string;
  type: string;
  userId: {
    username: string;
    id: string;
  };
  [key: string]: any;
}

export interface CategorizedOutfits {
  [key: string]: any[];
}
