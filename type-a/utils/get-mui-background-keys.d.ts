import type { ThemeBackgroundsTypes } from '../typings/parameters';
declare type BackgroundKeyTypes = 'default' | 'paper';
export declare function getMuiBackgroundKeys(background?: ThemeBackgroundsTypes): {
    appBg: BackgroundKeyTypes;
    appContentBg: BackgroundKeyTypes;
};
export {};
