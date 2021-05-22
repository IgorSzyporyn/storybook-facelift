import type { AddonStateParameters } from '../typings/parameters';
import type { AddonConfig, ConfigThemes, ConfigTitles } from '../typings/config';
export declare function createConfigDefaults(sourceParameters: AddonStateParameters): AddonConfig;
export declare function verifyConfig(configSource: AddonConfig, parametersSource: AddonStateParameters): {
    themes: ConfigThemes;
    titles: ConfigTitles;
};
