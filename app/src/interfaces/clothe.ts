import { User } from "./user";

export interface NewClothe {
  images: File[];
  type: string;
  season: string[];
  notes?: string;
}

export interface Clothe {
  id: string;
  images: ClotheImage[];
  type: string;
  season: string[];
  user: User;
  notes?: string;
}

export interface AddImages {
  closetId: string;
  images: File[];
}

export interface DeleteImages {
  closetId: string;
  images: string[];
}

export interface ClotheImage {
  id: string;
  file: string;
}

export interface CategorizedClothes {
  [key: string]: any[];
}
