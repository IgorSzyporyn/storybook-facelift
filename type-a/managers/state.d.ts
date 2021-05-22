import type { AddonStateParameters } from '../typings/parameters';
import type { AddonConfig } from '../typings/config';
import type { AddonState } from '../typings/state';
declare type CreateAddonPropsStateOptions = Pick<AddonState, 'themeName' | 'themeVariant'>;
declare type CreateAddonStateProps = {
    parameters: AddonStateParameters;
    config: AddonConfig;
    options?: CreateAddonPropsStateOptions;
};
export declare function createAddonState({ config: addonConfig, parameters: addonParameters, options, }: CreateAddonStateProps): AddonState;
export {};
