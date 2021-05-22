import type { ThemeVars as StorybookThemeOptions } from '@storybook/theming';
import type { ThemeConverterFnProps } from '../typings/parameters';
export declare function createStorybookThemeFromNative({ theme: _themeOptions, override, variant, background, }: ThemeConverterFnProps): {
    converted: StorybookThemeOptions;
    original: StorybookThemeOptions;
    instanciated: import("@storybook/theming").Theme;
} | null;
