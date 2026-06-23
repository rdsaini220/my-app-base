import React, { createContext, PropsWithChildren, useState, useEffect } from "react";
import { useColorScheme, Appearance } from "react-native";
import { VariableContextProvider } from "nativewind";
import { useAuthStore } from "../store/auth.store";

// Import centralized design tokens
import { colors } from "../theme/colors";

export type ThemeMode = "light" | "dark";

interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  isDark: boolean;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Generate light theme variables dynamically from theme files
const lightThemeVars = {
  // Colors (using NativeWind v5 --color- prefixes)
  "--color-background": colors.white,
  "--color-foreground": colors.dark[1],

  "--color-card": colors.white,
  "--color-card-foreground": colors.dark[1],

  "--color-popover": colors.white,
  "--color-popover-foreground": colors.dark[1],

  "--color-primary": colors.primary,
  "--color-primary-foreground": colors.white,

  "--color-secondary": colors.secondary,
  "--color-secondary-foreground": colors.white,

  "--color-muted": colors.gray[100],
  "--color-muted-foreground": colors.gray[600],

  "--color-accent": colors.primary,
  "--color-accent-foreground": colors.white,

  "--color-border": colors.gray[300],
  "--color-input": colors.gray[200],
  "--color-ring": colors.primary,

  "--color-success": colors.success,
  "--color-warning": colors.warning,
  "--color-error": colors.error,
  "--color-info": colors.info,
};

// Generate dark theme variables dynamically from theme files
const darkThemeVars = {
  // Colors (using NativeWind v5 --color- prefixes)
  "--color-background": colors.dark[1],
  "--color-foreground": colors.white,

  "--color-card": colors.dark[2],
  "--color-card-foreground": colors.white,

  "--color-popover": colors.dark[3],
  "--color-popover-foreground": colors.white,

  "--color-primary": colors.primary,
  "--color-primary-foreground": colors.white,

  "--color-secondary": colors.secondary,
  "--color-secondary-foreground": colors.white,

  "--color-muted": colors.dark[4],
  "--color-muted-foreground": colors.gray[400],

  "--color-accent": colors.primary,
  "--color-accent-foreground": colors.white,

  "--color-border": colors.dark[5],
  "--color-input": colors.dark[4],
  "--color-ring": colors.primary,

  "--color-success": colors.success,
  "--color-warning": colors.warning,
  "--color-error": colors.error,
  "--color-info": colors.info,
};

export function ThemeProvider({ children }: PropsWithChildren) {
  const systemScheme = useColorScheme();
  const user = useAuthStore((state) => state.user);
  const userTheme = user?.preferences?.theme;

  const [theme, setThemeState] = useState<ThemeMode>(() => {
    if (userTheme === "dark" || userTheme === "light") {
      return userTheme;
    }
    return systemScheme === "dark" ? "dark" : "light";
  });

  useEffect(() => {
    if (userTheme === "dark" || userTheme === "light") {
      setThemeState(userTheme);
      Appearance.setColorScheme(userTheme);
    } else if (systemScheme) {
      setThemeState(systemScheme);
      Appearance.setColorScheme(systemScheme);
    }
  }, [userTheme, systemScheme]);

  const isDark = theme === "dark";

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    Appearance.setColorScheme(newTheme);
  };

  const themeVars = isDark ? darkThemeVars : lightThemeVars;

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isDark }}>
      <VariableContextProvider value={themeVars}>
        {children}
      </VariableContextProvider>
    </ThemeContext.Provider>
  );
}