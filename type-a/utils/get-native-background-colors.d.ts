import { ThemeVars as StorybookThemeOptions } from '@storybook/theming';
import type { ThemeBackgroundsTypes } from '../typings/parameters';
export declare function getNativeBackgroundColors(theme: StorybookThemeOptions, background?: ThemeBackgroundsTypes): {
    appBg: string | undefined;
    appContentBg: string | undefined;
};
