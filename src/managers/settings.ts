import { Parameters, Settings } from '../typings'
import { createConfigDefaults, verifyConfig } from './config'
import { createAddonParameters, verifyParameters } from './parameters'
import { createAddonState } from './state'

export function createDefaultSettings(apiParameters?: Parameters.ApiParameters) {
  let defaultParameters = createAddonParameters(apiParameters)
  let defaultConfig = createConfigDefaults(defaultParameters)

  defaultParameters = verifyParameters(defaultParameters, defaultConfig)
  defaultConfig = verifyConfig(defaultConfig, defaultParameters)

  const defaultState = createAddonState({ parameters: defaultParameters, config: defaultConfig })

  const settings: Settings.AddonSettings = {
    initialized: false,
    parameters: defaultParameters,
    initialApiParameters: apiParameters,
    initialAddonParameters: defaultParameters,
    config: defaultConfig,
    state: defaultState,
  }

  return settings
}
