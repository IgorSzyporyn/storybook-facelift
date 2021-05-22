import { Theme as StorybookTheme } from '@storybook/theming';
import { ParamDocs } from '../typings/parameters';
declare type CreatePreviewColorsOptions = {
    params: ParamDocs;
    isDark: boolean;
};
export declare function createPreviewColors(theme: StorybookTheme, { params, isDark }: CreatePreviewColorsOptions): {
    background: {
        root: string;
        preview: string;
        docs: string;
        docsPreview: string;
        docsTable: string;
    };
    color: {
        root: string;
        preview: string;
        docs: string;
        rootLight: string;
        docsLight: string;
        docsTableLight: string;
    };
    border: {
        radius: number;
        color: string;
    };
};
export {};
