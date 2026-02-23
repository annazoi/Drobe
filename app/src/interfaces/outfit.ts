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
  clothes: Clothe[];
  colorScheme?: string;
  rating?: number;
  notes?: string;
  type: string;
  [key: string]: any;
}

export interface CategorizedOutfits {
  [key: string]: any[];
}
