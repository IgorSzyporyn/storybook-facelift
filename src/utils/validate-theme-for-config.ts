import { output } from './output'

import type { AddonStateParameters, ParamTheme } from '../typings/parameters'

export const validateThemeForConfig = (theme: ParamTheme, params: AddonStateParameters) => {
  let valid = true

  if (!theme.key) {
    valid = false
    output(`Missing critical property "key" theme`, 'error')
    return valid
  }

  if (!theme.title) {
    valid = false
    output(
      `No title given to theme "${theme.key}" - will not show up properly in the menu`,
      'warning'
    )
  }

  if (!theme.type) {
    output(`No type given for theme "${theme.key}" - falling back to Storybook`, 'warning')
  } else if (theme.type && !params.themeConverters[theme.type]) {
    output(`No matching converter for theme "${theme.key}"`, 'error')
    output(`hellloooo"`, 'error')
    return valid
  }

  if (!theme.variants) {
    output(`No variants provided for theme "${theme.key}"`)
    return valid
  }

  // @TODO - variants have changed - need to check for valid theme if extended variants parameter

  return valid
}
