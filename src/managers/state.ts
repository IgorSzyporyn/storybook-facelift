import { output } from '../utils/output'

import type { AddonStateParameters } from '../typings/parameters'
import type { AddonConfig } from '../typings/config'
import type { AddonState } from '../typings/state'

type CreateAddonPropsStateOptions = Pick<AddonState, 'themeName' | 'themeVariant'>

type CreateAddonStateProps = {
  parameters: AddonStateParameters
  config: AddonConfig
  options?: CreateAddonPropsStateOptions
}

export function createAddonState({
  config: addonConfig,
  parameters: addonParameters,
  options,
}: CreateAddonStateProps) {
  const { themes } = addonConfig
  const _themeName = (options && options.themeName) || addonParameters.defaultTheme
  const _themeVariant = (options && options.themeVariant) || addonParameters.defaultVariant

  const root = themes[_themeName]
  const original = root && root.original
  const instanciated = root && root.instanciated

  if (!root) {
    output(`Trying to set invalid theme "${_themeName}" (theme does not exist)`, 'error')
  }

  const themeName = _themeName
  let themeVariant = _themeVariant
  let theme = root && root[themeVariant]
  const themeType = root && root.type
  let themeOriginal = original && original[themeVariant]
  let themeInstanciated = instanciated && instanciated[themeVariant]

  if (root && !theme) {
    const oppositeVariant = themeVariant === 'dark' ? 'light' : 'dark'

    theme = root[oppositeVariant]
    themeVariant = oppositeVariant

    if (!theme) {
      output(`Trying to set invalid theme "${themeName}" (no variants)`, 'error')
    } else {
      themeOriginal = original && original[oppositeVariant]
      themeInstanciated = instanciated && instanciated[oppositeVariant]
    }
  }

  const addonState: AddonState = {
    theme,
    themeName,
    themeOriginal,
    themeType,
    themeVariant,
    themeInstanciated,
  }

  return addonState
}
