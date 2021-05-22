import type { AddonStateParameters, AddonParameters, DefaultParameters } from '../typings/parameters';
import type { AddonConfig } from '../typings/config';
import type { AddonSettings } from '../typings/settings';
export declare const defaultParameters: DefaultParameters;
export declare function createAddonParameters(apiParameters?: AddonParameters): AddonStateParameters;
export declare type updateAddonParametersProps = {
    apiParameters?: AddonParameters;
    settings: AddonSettings;
};
export declare function updateAddonParameters({ apiParameters, settings }: updateAddonParametersProps): {
    autoThemeStory?: boolean | undefined;
    defaultTheme: string;
    defaultVariant: import("../typings/parameters").ThemeVariantTypes;
    docs: import("../typings/parameters").ParamDocs;
    enhanceUi: boolean;
    includeNative: boolean;
    native?: import("../typings/parameters").ParamNative | undefined;
    override?: Pick<import("@storybook/theming").ThemeVars, "brandTitle" | "brandImage" | "brandUrl"> | undefined;
    themeConverters: Record<import("../typings/parameters").ThemeTypes, import("../typings/parameters").ThemeConverterFn | undefined>;
    themes?: import("../typings/parameters").ParamTheme[] | undefined;
    ui: import("../typings/parameters").ParamUI;
};
export declare function verifyParameters(parametersSource: AddonStateParameters, configSource: AddonConfig): {
    autoThemeStory?: boolean | undefined;
    defaultTheme: string;
    defaultVariant: import("../typings/parameters").ThemeVariantTypes;
    docs: import("../typings/parameters").ParamDocs;
    enhanceUi: boolean;
    includeNative: boolean;
    native?: import("../typings/parameters").ParamNative | undefined;
    override?: Pick<import("@storybook/theming").ThemeVars, "brandTitle" | "brandImage" | "brandUrl"> | undefined;
    themeConverters: Record<import("../typings/parameters").ThemeTypes, import("../typings/parameters").ThemeConverterFn | undefined>;
    themes?: import("../typings/parameters").ParamTheme[] | undefined;
    ui: import("../typings/parameters").ParamUI;
};
