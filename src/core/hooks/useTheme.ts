import { useContext } from 'react';
import { ThemeContext } from '../providers/ThemeProvider';
import { theme } from '../theme';

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return {
    ...context,
    colors: theme.colors,
    theme,
  };
};
