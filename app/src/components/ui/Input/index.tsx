import {
  Input as ChakraInput,
  Text,
  NumberInputField,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputStepper,
  useColorModeValue,
  FormLabel,
  FormControl,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";

type InputProps = {
  numberInput?: number;
  label?: string;
  text?: string;
  placeholder?: string;
  register?: any;
  error?: any;
  required?: boolean;
  icon?: any;
} & React.ComponentProps<typeof ChakraInput>;

const Input: React.FC<InputProps> = ({
  numberInput,
  text,
  placeholder,
  register,
  error,
  icon: Icon,
  label,
  required = false,
}) => {
  return (
    <FormControl isInvalid={!!error} isRequired={required}>
      {!numberInput ? (
        <>
          {label && <FormLabel>{label}</FormLabel>}
          <InputGroup>
            {Icon && (
              <InputLeftElement pointerEvents="none">
                <Icon color="gray.300" />
              </InputLeftElement>
            )}
            <ChakraInput
              {...register}
              {...error}
              mb={5}
              boxShadow={`0 2px 15px 0 ${useColorModeValue("pink", "white")}`}
              placeholder={placeholder}
            />
          </InputGroup>
        </>
      ) : (
        <>
          <Text mb={2}>{text}</Text>
          <NumberInput
            boxShadow={`0 2px 15px 0 ${useColorModeValue("pink", "white")}`}
            defaultValue={numberInput}
            min={5}
            mb={5}
            {...register}
            {...error}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </>
      )}
    </FormControl>
  );
};

export default Input;
