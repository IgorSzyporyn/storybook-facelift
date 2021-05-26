import type { AddonStateThemes } from '../typings/internal/state'
import type { AddonParameters } from '../typings/internal/parameters'

const getFirstThemeKey = (themes: AddonStateThemes) => {
  let firstThemeKey: string | undefined
  const themesLength = Object.keys(themes).length

  if (themesLength > 0) {
    ;[firstThemeKey] = Object.keys(themes).map((k) => k)
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
      themeKey = getFirstThemeKey(themes)
    }
  }

  // Check if variant is available - or change variant
  // Since default is light we may have to change to dark if only
  // dark themes are present
  const selectedTheme = themes[themeKey || '']
  if (!selectedTheme || !selectedTheme.storybook || !selectedTheme.storybook[defaultVariant]) {
    themeVariant = defaultVariant === 'light' ? 'dark' : 'light'
  }

  return { themeKey, themeVariant }
}
