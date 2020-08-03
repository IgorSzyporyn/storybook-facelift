import { Parameters, Settings } from '../typings'
import { output } from './output'

type CreateThemeState = {
  name?: string
  variant?: Parameters.ParameterThemeVariantTypes
}

export function createThemeState(settings: Settings.Settings, state: CreateThemeState) {
  const { config, parameters } = settings
  const { themes } = config
  const {
    name: stateName = parameters.defaultTheme,
    variant: stateVariant = parameters.defaultVariant,
  } = state

  const root = themes[stateName] || undefined
  const original = root && root.original ? root.original : undefined

  const themeName = stateName
  const themeType = root && root.type ? root.type : undefined
  let theme = root ? root[stateVariant] : undefined
  let themeVariant = stateVariant
  let themeOriginal = original && original[stateVariant] ? original[stateVariant] : undefined

  let valid = true

  if (!root) {
    output(`Trying to set invalid theme "${stateName}" (theme does not exist)`, 'error')
    valid = false
  }

  if (root && !theme) {
    const oppositeVariant = stateVariant === 'dark' ? 'light' : 'dark'
    theme = root[oppositeVariant]
    themeVariant = oppositeVariant

    if (!theme) {
      output(`Trying to set invalid theme "${stateName}" (no variants)`, 'error')
      valid = false
    } else {
      themeOriginal = original ? original[oppositeVariant] : undefined
    }
  }

  const themeParameters = {
    theme,
    themeOriginal,
    themeName,
    themeType,
    themeVariant,
  }

  return valid ? themeParameters : false
}
