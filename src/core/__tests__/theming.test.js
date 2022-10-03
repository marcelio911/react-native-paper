import { MD3DarkTheme, MD3LightTheme } from '../../styles/themes';
import { adaptNavigationTheme } from '../theming';

const DefaultTheme = {
  dark: false,
  colors: {
    primary: 'rgb(0, 122, 255)',
    background: 'rgb(242, 242, 242)',
    card: 'rgb(255, 255, 255)',
    text: 'rgb(28, 28, 30)',
    border: 'rgb(216, 216, 216)',
    notification: 'rgb(255, 59, 48)',
  },
};

const DefaultDarkTheme = {
  dark: true,
  colors: {
    primary: 'rgb(10, 132, 255)',
    background: 'rgb(1, 1, 1)',
    card: 'rgb(18, 18, 18)',
    text: 'rgb(229, 229, 231)',
    border: 'rgb(39, 39, 41)',
    notification: 'rgb(255, 69, 58)',
  },
};

const CustomLightNavigationTheme = {
  dark: false,
  colors: {
    primary: 'rgb(255, 45, 85)',
    secondary: 'rgb(150,45,85)',
    tertiary: 'rgb(105,45,85)',
    background: 'rgb(242, 242, 242)',
    card: 'rgb(255, 255, 255)',
    text: 'rgb(28, 28, 30)',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',
  },
};

describe('adaptNavigationTheme', () => {
  it('should return adapted navigation lightTheme', () => {
    const { LightTheme } = adaptNavigationTheme({
      lightTheme: DefaultTheme,
    });

    const { colors } = MD3LightTheme;

    expect(LightTheme).toMatchObject({
      ...DefaultTheme,
      colors: {
        ...DefaultTheme.colors,
        primary: colors.primary,
        background: colors.background,
        card: colors.elevation.level2,
        text: colors.onSurface,
        border: colors.outline,
        notification: colors.error,
      },
    });
  });

  it('should return adapted navigation darkTheme', () => {
    const { DarkTheme } = adaptNavigationTheme({
      darkTheme: DefaultDarkTheme,
    });

    const { colors } = MD3DarkTheme;

    expect(DarkTheme).toMatchObject({
      ...DefaultDarkTheme,
      colors: {
        ...DefaultDarkTheme.colors,
        primary: colors.primary,
        background: colors.background,
        card: colors.elevation.level2,
        text: colors.onSurface,
        border: colors.outline,
        notification: colors.error,
      },
    });
  });

  it('should return adapted custom navigation theme', () => {
    const { LightTheme } = adaptNavigationTheme({
      lightTheme: CustomLightNavigationTheme,
    });

    const { colors } = MD3LightTheme;

    expect(LightTheme).toMatchObject({
      ...CustomLightNavigationTheme,
      colors: {
        ...CustomLightNavigationTheme.colors,
        primary: colors.primary,
        background: colors.background,
        card: colors.elevation.level2,
        text: colors.onSurface,
        border: colors.outline,
        notification: colors.error,
        secondary: 'rgb(150,45,85)',
        tertiary: 'rgb(105,45,85)',
      },
    });
  });
});
