import { output } from '../output'

import type { AddonParameters, ParamTheme } from '../../typings/internal/parameters'

export const validateThemeForState = (
  { key, title, type, converter, providerOnly, variants }: ParamTheme,
  params: AddonParameters
) => {
  let valid = true
  const converters = params.themeConverters || {}

  // Validation errors

  // Key is a required parameter
  if (!key) {
    valid = false
    output(`Missing critical property "key" theme`, 'error')
  }

  // Type is a required parameter
  if (!type) {
    valid = false
    output(`No type given for theme "${key}"`, 'error')
  }

  // Storybook theming themes must have a converter
  if (!providerOnly) {
    if (!converter) {
      valid = false
      output(`Theme "${key}" must have a matching converter`, 'error')
    } else if (!converters[converter]) {
      valid = false
      output(`No matching converter named "${converter}" found for theme "${key}"`, 'error')
    }
  }

  // All themes must have variants
  if (!variants) {
    valid = false
    output(`No variants provided for theme "${key}"`)
  }

  // Minor validation warnings

  // If a Storybook theming theme - tell user that title is missing
  if (!title && !providerOnly) {
    valid = false
    output(`No title given to theme "${key}" - Will not show up properly in the menu`, 'warning')
  }

  return valid
}
