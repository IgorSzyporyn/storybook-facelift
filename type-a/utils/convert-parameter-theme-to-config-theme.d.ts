import { AddonStateParameters, ThemeConverterFn, ParamTheme, ThemeVariantTypes, ThemeVariant } from '../typings/parameters';
export declare type ConvertParameterThemeToConfigThemeProps = {
    parameters: AddonStateParameters;
    themeConfig: ParamTheme;
    themeVariant: ThemeVariant;
    converter: ThemeConverterFn;
    themeVariantName: ThemeVariantTypes;
};
export declare function convertParameterThemeToConfigTheme({ parameters, themeConfig, themeVariant, converter, themeVariantName: variant, }: ConvertParameterThemeToConfigThemeProps): import("../typings/parameters").ThemeConverterFnResult | null;
