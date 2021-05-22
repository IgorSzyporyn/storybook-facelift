import { ThemeOptions } from '@material-ui/core';
import type { ThemeConverterFnProps } from '../typings/parameters';
export declare function createStorybookThemeOptionsFromMui(converterProps: ThemeConverterFnProps): {
    converted: import("@storybook/theming").ThemeVars;
    original: ThemeOptions;
    instanciated: import("@material-ui/core").Theme;
} | null;
