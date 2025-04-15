
import { ChartConfig, THEMES } from "./types";

export function createColorVariables(config: ChartConfig) {
  const colorVars: Record<string, string> = {};

  // Process each color config
  Object.entries(config).forEach(([key, value]) => {
    if ("color" in value && value.color) {
      // Direct color value
      colorVars[`--color-${key}`] = value.color;
    } else if ("theme" in value && value.theme) {
      // Theme-specific colors
      Object.entries(THEMES).forEach(([themeKey, themeSelector]) => {
        if (value.theme?.[themeKey]) {
          const varName = `--color-${key}${themeSelector ? "-" + themeKey : ""}`;
          colorVars[varName] = value.theme[themeKey];
        }
      });
      
      // Set the default value to the light theme
      colorVars[`--color-${key}`] = value.theme.light;
    }
  });

  return colorVars;
}
