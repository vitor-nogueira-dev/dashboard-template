'use client';

import type React from 'react';
import { createContext, useContext, useState, useEffect, useMemo } from 'react';

export type ThemeColor = 'default' | 'blue' | 'green' | 'violet' | 'rose' | 'orange' | 'red' | 'cyan' | 'magenta' | 'purple' | 'amber' | 'teal' | 'emerald' | 'sky' | 'pink' | 'indigo';

type ThemeColorContextType = {
  themeColor: ThemeColor;
  setThemeColor: (color: ThemeColor) => void;
}

const ThemeColorContext = createContext<ThemeColorContextType | undefined>(undefined);

export function ThemeColorProvider({ children }: { children: React.ReactNode }) {
  const [themeColor, setThemeColor] = useState<ThemeColor>('emerald');

  // Load saved theme color from localStorage
  useEffect(() => {
    const savedColor = localStorage.getItem('theme-color') as ThemeColor | null;
    if (savedColor) {
      setThemeColor(savedColor);
      document.documentElement.setAttribute('data-theme-color', savedColor);
    }
  }, []);

  // Update theme color
  const updateThemeColor = (color: ThemeColor) => {
    setThemeColor(color);
    localStorage.setItem('theme-color', color);
    document.documentElement.setAttribute('data-theme-color', color);
  };

  const context = useMemo(() => ({ themeColor, setThemeColor: updateThemeColor }), [themeColor]);

  return (
    <ThemeColorContext.Provider value={context}>
      {children}
    </ThemeColorContext.Provider>
  );
}

export function useThemeColor() {
  const context = useContext(ThemeColorContext);
  if (context === undefined) {
    throw new Error('useThemeColor must be used within a ThemeColorProvider');
  }
  return context;
}
