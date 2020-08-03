import * as Parameters from './parameters'
import * as Config from './config'
import * as State from './state'

declare type AddonSettings = {
  parameters: Parameters.AddonParameters
  config: Config.AddonConfig
  state: State.AddonState
}
