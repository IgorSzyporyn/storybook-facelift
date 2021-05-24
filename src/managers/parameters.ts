import deepmerge from 'ts-deepmerge'
import { createStorybookThemeOptionsFromMui } from '../utils/create-storybook-theme-from-mui'
import { createStorybookThemeFromBadgerUi } from '../utils/create-storybook-theme-from-badgerui'
import { createStorybookThemeFromNative } from '../utils/create-storybook-theme-from-native'

import type {
  AddonStateParameters,
  AddonParameters,
  DefaultParameters,
  StoryParameters,
} from '../typings/internal/parameters'
import type { AddonConfig, ConfigThemes } from '../typings/internal/config'
import type { AddonSettings } from '../typings/internal/settings'

export const defaultParameters: DefaultParameters = {
  defaultTheme: 'native',
  autoThemeStory: false,
  includeNative: false,
  themeConverters: {
    mui: createStorybookThemeOptionsFromMui,
    native: createStorybookThemeFromNative,
    badgerui: createStorybookThemeFromBadgerUi,
    styled: createStorybookThemeFromBadgerUi,
  },
  docs: {
    type: 'full',
  },
  enhanceUi: false,
  ui: {
    elevation: 2,
  },
}

export function createAddonParameters(apiParameters?: AddonParameters) {
  const parameters: AddonStateParameters = deepmerge(
    { defaultVariant: 'light', ...defaultParameters },
    apiParameters || {}
  )

  return parameters
}

export type updateAddonParametersProps = {
  apiParameters?: AddonParameters
  settings: AddonSettings
}

export function updateAddonParameters({ apiParameters, settings }: updateAddonParametersProps) {
  const { parameters: addonParameters } = settings
  let returnParameters = { ...addonParameters }

  if (!apiParameters) {
    return returnParameters
  }

  // Initialized means we are being given custom parameters from a story most likely
  // Only allow certain parameters to be merged on to addon parameters
  if (settings.initialized && settings.initialAddonParameters) {
    const { ui = {}, docs = {}, override = {}, enhanceUi, autoThemeStory } = apiParameters
    const customParameters: StoryParameters = {
      ui,
      docs,
      override,
      enhanceUi,
      autoThemeStory,
    }

    returnParameters = deepmerge(settings.initialAddonParameters, customParameters)
  } else {
    returnParameters = {
      ...addonParameters,
      ...apiParameters,
      themeConverters: {
        ...addonParameters.themeConverters,
        ...(apiParameters.themeConverters || {}),
      },
    }
  }

  return returnParameters
}

const getFirstThemeKey = (themes: ConfigThemes) => Object.keys(themes).map((k) => k)[0]

export function verifyParameters(
  parametersSource: AddonStateParameters,
  configSource: AddonConfig
) {
  const parameters = { ...parametersSource }
  const config = { ...configSource }

  const { defaultTheme, defaultVariant, includeNative: includeNativeTheme } = parameters
  const { themes } = config

  const themeMatches = themes[defaultTheme] !== undefined

  // Theme did not match - probably due to missing defaultTheme and no native theme
  if (!themeMatches) {
    // Just pick the first one in line as the new default theme
    const newDefaultThemeName = getFirstThemeKey(themes)
    parameters.defaultTheme = newDefaultThemeName

    // Check if variant matches, if not set to the opposite as there are only
    // the two options and theme has to contain one of them
    const newDefaultTheme = themes[newDefaultThemeName]

    if (newDefaultTheme) {
      const variantMatches = newDefaultTheme[defaultVariant] !== undefined

      if (!variantMatches) {
        parameters.defaultVariant = defaultVariant === 'dark' ? 'light' : 'dark'
      }
    }
  } else {
    // Theme did match - check if native is present and allowed
    const includeNative = includeNativeTheme === true
    const defaultIsNative = defaultTheme === 'native'
    const nativeIsPresent = themes.native !== undefined
    const hasAdditionalThemes = Object.keys(themes).length > (nativeIsPresent ? 1 : 0)
    let newDefaultThemeName = defaultTheme

    // Default is native, but not allowed (native will be cleared out if still present)
    // However we can not make a change if it is the only theme present
    if (defaultIsNative && !includeNative) {
      if (nativeIsPresent && hasAdditionalThemes) {
        const themesClone = { ...themes }
        delete themesClone.native

        newDefaultThemeName = getFirstThemeKey(themesClone)
      } else if (!nativeIsPresent) {
        newDefaultThemeName = getFirstThemeKey(themes)
      }
    }

    parameters.defaultTheme = newDefaultThemeName

    const newDefaultTheme = themes[newDefaultThemeName]

    if (newDefaultTheme) {
      const variantMatches = newDefaultTheme[defaultVariant] !== undefined

      if (!variantMatches) {
        parameters.defaultVariant = defaultVariant === 'dark' ? 'light' : 'dark'
      }
    }
  }

  return parameters
}
