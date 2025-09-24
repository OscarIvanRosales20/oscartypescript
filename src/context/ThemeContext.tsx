// ThemeContext.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { darkTheme, lightTheme } from './themes';

type Theme = typeof lightTheme;
type ThemeMode = 'light' | 'dark' | 'system';


type ThemeContextType = {
  theme: Theme;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;

};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);


export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme debe usarse dentro de ThemeProvider');
  return context;
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const getSystemPreference = () =>
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

  const getStoredTheme = () =>
    (localStorage.getItem('theme-mode') as ThemeMode | null) || 'system';

  const [themeMode, setThemeModeState] = useState<ThemeMode>(getStoredTheme);
  const [theme, setTheme] = useState<Theme>(
    themeMode === 'light' ? lightTheme :
    themeMode === 'dark' ? darkTheme :
    getSystemPreference() === 'dark' ? darkTheme : lightTheme
  );

  const setThemeMode = (mode: ThemeMode) => {
    localStorage.setItem('theme-mode', mode);
    setThemeModeState(mode);
  };

  // Escucha cambios en el sistema si el modo es 'system'
  useEffect(() => {
    const applyTheme = () => {
      const resolvedTheme =
        themeMode === 'light' ? lightTheme :
        themeMode === 'dark' ? darkTheme :
        getSystemPreference() === 'dark' ? darkTheme : lightTheme;
      setTheme(resolvedTheme);
    };

    applyTheme();

    if (themeMode === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => applyTheme();
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [themeMode]);

  return (
    <ThemeContext.Provider value={{ theme, themeMode, setThemeMode }}>
      <div style={{ backgroundColor: theme.background, color: theme.color, minHeight: '100vh' }}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};
