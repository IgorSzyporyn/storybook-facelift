import { output } from './output'

import type { AddonParameters, ParamTheme } from '../typings/internal/parameters'

export const validateThemeForConfig = (theme: ParamTheme, params: AddonParameters) => {
  let valid = true

  if (!theme.key) {
    valid = false
    output(`Missing critical property "key" theme`, 'error')
    return valid
  }

  if (!theme.title && !theme.providerOnly) {
    valid = false
    output(
      `No title given to theme "${theme.key}" - will not show up properly in the menu`,
      'warning'
    )
  }

  const themeConverters = params.themeConverters || {}

  if (!theme.type) {
    output(`No type given for theme "${theme.key}" - falling back to Storybook`, 'warning')
  } else if (theme.type && !themeConverters[theme.type] && !theme.provider) {
    output(`No matching converter for theme "${theme.key}"`, 'error')
    return valid
  }

  if (!theme.variants) {
    output(`No variants provided for theme "${theme.key}"`)
    return valid
  }

  return valid
}
