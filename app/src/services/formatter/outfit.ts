import { Outfit } from "../../interfaces/outfit";
import { formatUser } from "./user";

export const formatOutfit = (data: any): Outfit => {
  return {
    id: data._id,
    clothes: data.clothes,
    colorScheme: data.colorScheme,
    rating: data.rating,
    notes: data.notes,
    type: data.type,
    userId: formatUser(data.userId),
  };
};
