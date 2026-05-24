// src/theme.ts
import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const customConfig = defineConfig({
  theme: {
    tokens: {
      fonts: {
        heading: { value: "'Baloo 2 Variable', system-ui" },
      },
      colors: {
        beige: {
          100: { value: "#f6ddc8" },
          600: { value: "#A7856B" },
        },
      },
    },
    semanticTokens: {
      colors: {
        beige: {
          subtle: { value: "{colors.beige.100}" },
          fg: { value: "{colors.beige.600}" },
        },
      },
    },
  },

  globalCss: {
    "html, body": {
      margin: 0,
      padding: 0,
      width: "100%",
      minHeight: "100vh",
    },
    body: {
      bg: { base: "#f6ddc8", _dark: "gray.950" },
      color: { base: "gray.900", _dark: "white" },
    },
  },
});

export const system = createSystem(defaultConfig, customConfig);
