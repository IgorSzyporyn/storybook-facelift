import type { ThemeVars } from '@storybook/theming';
import type { ThemeOptions } from 'badger-ui';
import type { ThemeConverterFnProps } from '../typings/parameters';
export declare function createStorybookThemeFromBadgerUi({ theme, override, variant, }: ThemeConverterFnProps): {
    converted: ThemeVars;
    original: ThemeOptions<Record<string, string>>;
    instanciated: import("badger-ui").Theme<unknown>;
} | null;
