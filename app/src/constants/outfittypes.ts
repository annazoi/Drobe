import { OutfitCategoriesEnum } from "../enums/outfitType";
import { OptionItem } from "../interfaces/components";

export const OUTFIT_TYPES: OptionItem[] = [
  {
    value: OutfitCategoriesEnum.RUNNING,
    label: "Running",
  },
  {
    value: OutfitCategoriesEnum.MORNING,
    label: "Morning",
  },
  {
    value: OutfitCategoriesEnum.AFTERNOON,
    label: "Afternoon",
  },
  {
    value: OutfitCategoriesEnum.EVENING,
    label: "Evening",
  },
  {
    value: OutfitCategoriesEnum.NIGHT,
    label: "Night",
  },
  {
    value: OutfitCategoriesEnum.CASUAL,
    label: "Casual",
  },
  {
    value: OutfitCategoriesEnum.FORMAL,
    label: "Formal",
  },
  {
    value: OutfitCategoriesEnum.PARTY,
    label: "Party",
  },
  {
    value: OutfitCategoriesEnum.WORKOUT,
    label: "Workout",
  },
  {
    value: OutfitCategoriesEnum.WORKING,
    label: "Working",
  },
  {
    value: OutfitCategoriesEnum.CYCLING,
    label: "Cycling",
  },
  {
    value: OutfitCategoriesEnum.SCHOOL,
    label: "School",
  },
  {
    value: OutfitCategoriesEnum.UNIVERSITY,
    label: "University",
  },
  {
    value: OutfitCategoriesEnum.SWIMMING,
    label: "Swimming",
  },
  {
    value: OutfitCategoriesEnum.YOGA,
    label: "Yoga",
  },
  {
    value: OutfitCategoriesEnum.OTHER,
    label: "Other",
  },
];

export const OUTFIT_TYPES_ARRAY = OUTFIT_TYPES.map((type) => type.value);
