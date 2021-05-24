import { output } from '../utils/output'

import type { AddonStateParameters } from '../typings/internal/parameters'
import type { AddonConfig } from '../typings/internal/config'
import type { AddonState } from '../typings/internal/state'

type CreateAddonPropsStateOptions = Pick<AddonState, 'themeName' | 'themeVariant' | 'themeProvider'>

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
  const _themeProvider = (options && options.themeProvider) || addonParameters.defaultProvider

  const root = themes[_themeName]
  const original = root && root.original
  const instanciated = root && root.instanciated

  if (!root) {
    output(`Trying to set invalid theme "${_themeName}" (theme does not exist)`, 'error')
  }

  const themeType = root && root.type
  const themeName = _themeName
  const themeProvider = (root && root.provider) || _themeProvider

  let theme = root && root[_themeVariant]
  let themeVariant = _themeVariant
  let themeOriginal = original && original[themeVariant]
  let themeInstanciated = instanciated && instanciated[themeVariant]

  // Look in root (all themes) if the wanted theme can not be found for the
  // opposite variant (no light - look for dark)
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
    themeProvider,
  }

  return addonState
}
