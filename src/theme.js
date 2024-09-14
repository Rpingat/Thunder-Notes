import { extendTheme } from "@chakra-ui/react";

const customTheme = extendTheme({
  colors: {
    brand: {
      100: "#f7fafc",
      900: "#1a202c",
    },
    yellowMode: {
      100: "#FFF9C4",
      200: "#FFF176",
      900: "#FBC02D",
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: "bold",
        borderRadius: "8px",
        padding: "12px",
        _hover: {
          transform: "scale(1.05)",
          boxShadow: "lg",
        },
        _active: {
          transform: "scale(0.95)",
        },
      },
    },
  },
});

export default customTheme;

