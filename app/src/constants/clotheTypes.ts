import { ClotheCategories } from "../enums/clothes";
import { OptionItem } from "../interfaces/components";

export const CLOTHE_TYPES: OptionItem[] = [
  {
    value: ClotheCategories.TOP_AND_T_SHIRTS,
    label: "Tops & T-shirts",
  },
  {
    value: ClotheCategories.SWEATER_AND_HOODIES,
    label: "Sweaters & Hoodies",
  },
  {
    value: ClotheCategories.BOTTOMS_AND_LEGGINGS,
    label: "Bottoms & Leggings",
  },

  {
    value: ClotheCategories.JUMPSUITS_AND_DRESSES,
    label: "Jumpsuits & Dresses",
  },
  {
    value: ClotheCategories.JACKETS_AND_COATS,
    label: "Jackets & Coats",
  },
  {
    value: ClotheCategories.SHORTS_AND_SKIRTS,
    label: "Shorts & Skirts",
  },
  {
    value: ClotheCategories.SHOES_AND_SOCKS,
    label: "Shoes & Socks",
  },
  {
    value: ClotheCategories.SUIT,
    label: "Suits",
  },
  {
    value: ClotheCategories.ACCESSORIES,
    label: "Accessories",
  },
  {
    value: ClotheCategories.OTHER,
    label: "Other",
  },
];

export const CLOTHE_TYPES_ARRAY = CLOTHE_TYPES.map((item) => item.value);
export const CLOTHE_TYPES_LABELS = CLOTHE_TYPES.map((item) => item.label);

export const SEASONS: OptionItem[] = [
  {
    value: "Winter",
    label: "Winter",
  },
  {
    value: "Spring",
    label: "Spring",
  },
  {
    value: "Summer",
    label: "Summer",
  },
  {
    value: "Fall",
    label: "Fall",
  },
  {
    value: "All",
    label: "All",
  },
];
export const SEASONS_ARRAY = SEASONS.map((season) => season.value);
