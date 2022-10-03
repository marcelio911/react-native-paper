import { createTheming } from '@callstack/react-theme-provider';

import {
  MD2DarkTheme,
  MD2LightTheme,
  MD3DarkTheme,
  MD3LightTheme,
} from '../styles/themes';
import type {
  Theme,
  MD2Theme,
  MD3Theme,
  NavigationThemes,
  AdaptedNavigationThemes,
} from '../types';

export const DefaultTheme = MD3LightTheme;

const {
  ThemeProvider,
  withTheme,
  useTheme: useThemeProviderTheme,
} = createTheming<Theme>(DefaultTheme);

const useTheme = (overrides?: Parameters<typeof useThemeProviderTheme>[0]) =>
  useThemeProviderTheme<MD2Theme | MD3Theme>(overrides);

export { ThemeProvider, withTheme, useTheme };

export const defaultThemesByVersion = {
  2: {
    light: MD2LightTheme,
    dark: MD2DarkTheme,
  },
  3: {
    light: MD3LightTheme,
    dark: MD3DarkTheme,
  },
};

export const getTheme = (isDark = false, isV3 = true) => {
  const themeVersion = isV3 ? 3 : 2;
  const scheme = isDark ? 'dark' : 'light';

  return defaultThemesByVersion[themeVersion][scheme];
};

export const adaptNavigationTheme = ({
  lightTheme,
  darkTheme,
}: NavigationThemes): AdaptedNavigationThemes => {
  const modes = ['light', 'dark'] as const;

  const MD3Themes = {
    light: MD3LightTheme,
    dark: MD3DarkTheme,
  };

  const NavigationThemes = {
    light: lightTheme,
    dark: darkTheme,
  };

  const { light, dark } = modes.reduce(
    (prev, curr) => {
      const { colors } = MD3Themes[curr];

      return {
        ...prev,
        [curr]: {
          ...NavigationThemes[curr],
          colors: {
            ...NavigationThemes[curr]?.colors,
            primary: colors.primary,
            background: colors.background,
            card: colors.elevation.level2,
            text: colors.onSurface,
            border: colors.outline,
            notification: colors.error,
          },
        },
      };
    },
    {
      light: undefined,
      dark: undefined,
    }
  );

  return {
    LightTheme: light,
    DarkTheme: dark,
  };
};
