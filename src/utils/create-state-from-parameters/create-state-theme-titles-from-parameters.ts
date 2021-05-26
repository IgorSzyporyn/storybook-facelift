import type { AddonStateThemeTitles } from '../../typings/internal/state'
import type { AddonParameters } from '../../typings/internal/parameters'

export const createStateThemeTitlesFromParameters = (parameters: AddonParameters) => {
  const themeTitles: AddonStateThemeTitles = {}

  if (parameters.includeNative) {
    themeTitles.native = (parameters.native && parameters.native.title) || 'Native Storybook'
  }

  if (!parameters.themes) {
    return themeTitles
  }

  parameters.themes.forEach((theme) => {
    if (!theme.providerOnly) {
      themeTitles[theme.key] = theme.title
    }
  })

  return themeTitles
}
