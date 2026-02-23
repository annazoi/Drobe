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
  ...rest
}) => {
  const borderColor = useColorModeValue("neutral.200", "neutral.700");
  const focusBorderColor = useColorModeValue("brand.500", "brand.300");

  return (
    <FormControl isInvalid={!!error} isRequired={required}>
      {!numberInput ? (
        <>
          {label && (
            <FormLabel 
              fontSize="xs" 
              fontWeight="700" 
              textTransform="uppercase" 
              letterSpacing="widest"
              mb={2}
              color="neutral.500"
            >
              {label}
            </FormLabel>
          )}
          <InputGroup>
            {Icon && (
              <InputLeftElement pointerEvents="none" h="48px">
                <Icon color="neutral.300" />
              </InputLeftElement>
            )}
            <ChakraInput
              {...register}
              {...rest}
              h="48px"
              borderRadius="0"
              fontSize="sm"
              borderColor={borderColor}
              _hover={{ borderColor: "neutral.300" }}
              _focus={{ 
                borderColor: focusBorderColor,
                boxShadow: "none",
                bg: "white"
              }}
              _placeholder={{ color: "neutral.300", fontSize: "xs", letterSpacing: "widest" }}
              bg="neutral.50"
              transition="all 0.2s"
              placeholder={placeholder}
            />
          </InputGroup>
        </>
      ) : (
        <>
          <Text 
            fontSize="xs" 
            fontWeight="700" 
            textTransform="uppercase" 
            letterSpacing="widest" 
            mb={2}
            color="neutral.500"
          >
            {text}
          </Text>
          <NumberInput
            defaultValue={numberInput}
            min={5}
            {...register}
          >
            <NumberInputField 
               h="48px"
               borderRadius="0"
               borderColor={borderColor}
               _hover={{ borderColor: "neutral.300" }}
               _focus={{ 
                 borderColor: focusBorderColor,
                 boxShadow: "none"
               }}
            />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </>
      )}
      {error && (
        <Text color="red.500" fontSize="10px" mt={1} fontWeight="600" letterSpacing="wider">
          {error.toUpperCase()}
        </Text>
      )}
    </FormControl>
  );
};

export default Input;
