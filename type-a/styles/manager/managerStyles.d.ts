import { ThemeVars as StorybookThemeOptions } from '@storybook/theming';
import type { ParamDocs, ParamUI, ThemeVariantTypes } from '../../typings/parameters';
export declare const rootId = "#root";
export declare const mainRoot: string;
export declare const sidebarHeading: string;
export declare const sidebarForm: string;
export declare const sidebarMenu: string;
export declare const menuHeader: string;
export declare const menuItem: string;
export declare const menuItemSelected: string;
export declare const menuItemExpander: string;
export declare const menuIcon: string;
export declare const menuItemIcon: string;
export declare const menuItemTitle: string;
export declare const menuSubitem: string;
export declare const menuItemIconSelected: string;
export declare const menuItemTitleSelected: string;
export declare const modalMenu = "body > div:last-child";
export declare function enhanceManagerStyles(styles: {
    [key: string]: Record<string, any>;
}, themeVars: StorybookThemeOptions, themeVariant: ThemeVariantTypes, ui: ParamUI, _docs: ParamDocs): {
    [key: string]: Record<string, any>;
};
