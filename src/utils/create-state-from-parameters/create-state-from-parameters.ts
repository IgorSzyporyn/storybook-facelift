import { createStateThemeTitlesFromParameters } from './create-state-theme-titles-from-parameters'
import { createStateThemesFromParameters } from './create-state-themes-from-parameters'

import type { AddonParameters } from '../../typings/internal/parameters'

export const createStateFromParameters = (parameters: AddonParameters) => {
  const themeTitles = createStateThemeTitlesFromParameters(parameters)
  const themes = createStateThemesFromParameters(parameters)
  const converters = parameters.themeConverters || {}

  return {
    converters,
    themeTitles,
    themes,
  }
}
