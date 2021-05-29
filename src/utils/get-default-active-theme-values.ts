import type { AddonStateThemes } from '../typings/internal/state'
import type { AddonParameters } from '../typings/internal/parameters'

const getFirstThemeKey = (themeStateMap: AddonStateThemes, allowNative = false) => {
  let firstThemeKey: string | undefined

  // We are only interested in themes that are not providerOnly
  const themes = Object.keys(themeStateMap)
    .filter((k) => {
      const isProviderOnly = themeStateMap[k].providerOnly

      if (isProviderOnly) {
        return false
      }

      const isNative = k === 'native'

      if (isNative && !allowNative) {
        return false
      }

      return true
    })
    .map((k) => themeStateMap[k])

  if (themes.length > 0) {
    firstThemeKey = themes[0].key
  }

  return firstThemeKey
}

type GetDefaultActiveThemeValuesProps = {
  parameters: AddonParameters
  themes: AddonStateThemes
}

export const getDefaultActiveThemeValues = ({
  parameters,
  themes,
}: GetDefaultActiveThemeValuesProps) => {
  const { defaultTheme, defaultVariant = 'light' } = parameters
  let themeKey = defaultTheme
  let themeVariant = defaultVariant

  // No default theme key is set
  if (!defaultTheme) {
    // check for native or set to first in themes map
    if (parameters.includeNative) {
      themeKey = 'native'
    } else {
      themeKey = getFirstThemeKey(themes, parameters.includeNative)
    }
  }

  // Check if variant is available - or change variant
  // Since default is light we may have to change to dark if only
  // dark themes are present

  // No first themeKey found - fallback to native
  if (!themeKey) {
    themeKey = 'native'
  }

  const selectedTheme = themes[themeKey]

  if (!selectedTheme || !selectedTheme.storybook || !selectedTheme.storybook[defaultVariant]) {
    themeVariant = defaultVariant === 'light' ? 'dark' : 'light'
  }

  return { themeKey, themeVariant }
}
