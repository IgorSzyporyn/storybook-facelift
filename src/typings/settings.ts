import type { AddonParameters } from './parameters'
import type { AddonState } from './state'
import type { AddonConfig } from './config'

export type AddonSettings = {
  initialized: boolean
  initialAddonParameters: AddonParameters | undefined
  parameters: AddonParameters
  config: AddonConfig
  state: AddonState
}
