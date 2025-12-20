// frontend/context/AppSettingsContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

type ThemeMode = "dark" | "light";

type AppSettingsContextType = {
  theme: ThemeMode;
  toggleTheme: () => void;
};

const AppSettingsContext = createContext<AppSettingsContextType | undefined>(
  undefined
);

export function AppSettingsProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeMode>("dark");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <AppSettingsContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </AppSettingsContext.Provider>
  );
}

export function useAppSettings() {
  const ctx = useContext(AppSettingsContext);
  if (!ctx) {
    throw new Error("useAppSettings must be used within AppSettingsProvider");
  }
  return ctx;
}
