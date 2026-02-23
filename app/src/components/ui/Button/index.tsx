import { Button as ChakraButton, useColorModeValue } from "@chakra-ui/react";

type ButtonProps = {
  children?: React.ReactNode;
  colorScheme?: string;
  isLoading?: boolean;
  type?: "submit" | "reset" | "button";
  loadingText?: string;
  text?: string;
  bg?: string;
  variant?: "outline" | "solid" | "ghost" | "link" | "unstyled";
  onClick?: () => void;
  width?: string;
  marginTop?: number;
  marginBottom?: number;
  marginRight?: number;
  secondary?: boolean;
  rightIcon?: React.ReactNode;
} & React.ComponentProps<typeof ChakraButton>;

const Button: React.FC<ButtonProps> = ({
  type,
  text,
  colorScheme,
  isLoading,
  bg,
  variant,
  onClick,
  width,
  marginTop,
  marginBottom,
  loadingText,
  marginRight,
  secondary,
  rightIcon,
}) => {
  return (
    <ChakraButton
      type={type}
      colorScheme={colorScheme}
      isLoading={isLoading}
      loadingText={loadingText}
      bg={
        bg
          ? bg
          : !secondary
          ? useColorModeValue("pink.300", "black")
          : useColorModeValue("gray.100", "gray.300")
      }
      variant={variant || "solid"}
      onClick={onClick}
      w={width}
      mt={marginTop}
      mb={marginBottom}
      mr={marginRight}
      rightIcon={rightIcon}
    >
      {text}
    </ChakraButton>
  );
};

export default Button;
