import { capsFirst } from ".";

export default function capsFirstLowerThen(str: any) {
  const lowerStr = str.toLowerCase();
  return capsFirst(lowerStr);
}
