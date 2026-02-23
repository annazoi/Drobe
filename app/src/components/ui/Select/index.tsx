import { Select as ChakraSelect } from "@chakra-ui/react";
import { FC } from "react";
import { OptionItem } from "../../../interfaces/components";

type SelectProps = {
  placeholder?: string;
  onChange?: any;
  options?: OptionItem[];
  label?: string;
} & React.ComponentProps<typeof ChakraSelect>;

const Select: FC<SelectProps> = ({ placeholder, onChange, options = [] }) => {
  return (
    <ChakraSelect onChange={onChange} placeholder={placeholder}>
      {options.map((option: OptionItem, index: number) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </ChakraSelect>
  );
};

export default Select;
