import { createConfigDefaults, verifyConfig } from './config'
import { createDefaultAddonParameters, verifyParameters } from './parameters'
import { createAddonState } from './state'

import type { AddonParameters } from '../typings/internal/parameters'
import type { AddonSettings } from '../typings/internal/settings'

export function createDefaultSettings(apiParameters?: AddonParameters) {
  let defaultParameters = createDefaultAddonParameters(apiParameters)
  let defaultConfig = createConfigDefaults(defaultParameters)

  defaultParameters = verifyParameters(defaultParameters, defaultConfig)
  defaultConfig = verifyConfig(defaultConfig, defaultParameters)

  const defaultState = createAddonState({ parameters: defaultParameters, config: defaultConfig })

  const settings: AddonSettings = {
    initialized: false,
    parameters: defaultParameters,
    initialAddonParameters: defaultParameters,
    config: defaultConfig,
    state: defaultState,
  }

  return settings
}
