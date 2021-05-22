import type { AddonStateParameters } from './parameters'
import type { AddonState } from './state'
import type { AddonConfig } from './config'

export type AddonSettings = {
  initialized: boolean
  initialAddonParameters: AddonStateParameters | undefined
  parameters: AddonStateParameters
  config: AddonConfig
  state: AddonState
}
