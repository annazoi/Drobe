import { CLOTHE_TYPES_ARRAY } from "../constants/clotheTypes";
import { CategorizedClothes, Clothe } from "../interfaces/clothe";

interface CategorizeClothesProps {
  data: Clothe[];
  setClothes: (clothes: CategorizedClothes) => void;
}

export const categorizeClothes = ({
  data,
  setClothes,
}: CategorizeClothesProps) => {
  let tempClothes: { [key: string]: any[] } = {};

  for (let i = 0; i < CLOTHE_TYPES_ARRAY.length; i++) {
    tempClothes[CLOTHE_TYPES_ARRAY[i]] = [];
    for (let j = 0; j < data?.length; j++) {
      if (CLOTHE_TYPES_ARRAY[i] === data[j]?.type) {
        tempClothes[CLOTHE_TYPES_ARRAY[i]].push(data[j]);
      }
    }
  }
  setClothes(tempClothes);
};
