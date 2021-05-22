import { createConfigDefaults, verifyConfig } from './config'
import { createAddonParameters, verifyParameters } from './parameters'
import { createAddonState } from './state'

import type { ApiParameters } from '../typings/parameters'
import type { AddonSettings } from '../typings/settings'

export function createDefaultSettings(apiParameters?: ApiParameters) {
  let defaultParameters = createAddonParameters(apiParameters)
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
