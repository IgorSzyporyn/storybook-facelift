import { Theme as StorybookTheme } from '@storybook/theming';
import type { ParamDocs } from '../typings/parameters';
declare type CreateDocsTableStylesOptions = {
    params: ParamDocs;
    isDark: boolean;
    isToolPanel?: boolean;
};
export declare function createDocsTableStyles(theme: StorybookTheme, { params, isDark, isToolPanel }: CreateDocsTableStylesOptions): Record<string, any>;
export {};
