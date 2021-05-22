import { ThemeVars } from '@storybook/theming';
import type { ParamDocs, ParamUI } from '../../typings/parameters';
import { ThemeVariantTypes } from '../../typings/parameters';
export declare function enhancePreviewStyles(styles: {
    [key: string]: Record<string, any>;
}, themeVars: ThemeVars, themeVariant: ThemeVariantTypes, uiParams: ParamUI, docsParams: ParamDocs): {
    [key: string]: Record<string, any>;
};
