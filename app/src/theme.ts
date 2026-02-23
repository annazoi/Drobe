import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  colors: {
    brand: {
      50: "#fffbeb",
      100: "#fef3c7",
      200: "#fde68a",
      300: "#fcd34d",
      400: "#fbbf24",
      500: "#d4af37", // Premium Gold
      600: "#b4942d",
      700: "#927724",
      800: "#705b1b",
      900: "#4e4013",
    },
    neutral: {
      50: "#FAFAFA", // White
      100: "#F5F5F5",
      200: "#E5E5E5",
      300: "#D4D4D4",
      400: "#A3A3A3",
      500: "#737373",
      600: "#525252",
      700: "#404040",
      800: "#262626",
      900: "#1A1A1A", // Deep Charcoal
    },
  },
  fonts: {
    heading: "'Montserrat', sans-serif",
    body: "'Inter', sans-serif",
  },
  space: {
    1: "8px",
    2: "16px",
    3: "24px",
    4: "32px",
    5: "40px",
    6: "48px",
    7: "56px",
    8: "64px",
    9: "72px",
    10: "80px",
  },
  styles: {
    global: {
      body: {
        bg: "neutral.50",
        color: "neutral.900",
        lineHeight: "base",
      },
    },
  },
  components: {
    Container: {
      baseStyle: {
        maxW: "container.xl",
        px: { base: 4, md: 8 },
      },
    },
    Button: {
      baseStyle: {
        borderRadius: "0", // High-end minimal look
        fontWeight: "600",
        textTransform: "uppercase",
        letterSpacing: "0.1em",
        transition: "all 0.3s ease",
      },
      variants: {
        solid: {
          bg: "neutral.900",
          color: "neutral.50",
          _hover: {
            bg: "brand.500",
            transform: "translateY(-1px)",
          },
        },
        outline: {
          border: "1px solid",
          borderColor: "neutral.900",
          color: "neutral.900",
          _hover: {
            bg: "neutral.900",
            color: "neutral.50",
          },
        },
      },
    },
  },
});

export default theme;
