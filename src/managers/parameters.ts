import { getPreferredColorScheme } from '@storybook/theming/dist/utils'
import { Config, Parameters, Settings } from '../typings'
import { createStorybookThemeFromMui } from '../utils/create-storybook-theme-from-mui'
import { createStorybookThemeOptionsFromMuiOptions } from '../utils/create-storybook-theme-from-mui-options'
import { createStorybookThemeFromNative } from '../utils/create-storybook-theme-from-native'

export const defaultParameters: Parameters.DefaultParameters = {
  defaultTheme: 'native',
  includeNative: false,
  docs: 'full',
  main: {
    elevation: 2,
  },
}

export function createAddonParameters(apiParameters?: Parameters.ApiParameters) {
  const mergedParameters = { ...defaultParameters, ...apiParameters }

  const defaultVariant = mergedParameters.defaultVariant || getPreferredColorScheme()
  const themeConverters = mergedParameters.themeConverters || {}

  themeConverters.mui = createStorybookThemeFromMui
  themeConverters.native = createStorybookThemeFromNative
  themeConverters['mui-options'] = createStorybookThemeOptionsFromMuiOptions

  const parameters: Parameters.AddonParameters = {
    _initialized: false,
    defaultTheme: mergedParameters.defaultTheme,
    defaultVariant: defaultVariant,
    docs: mergedParameters.docs,
    includeNative: mergedParameters.includeNative,
    main: { ...defaultParameters.main, ...mergedParameters.main },
    native: mergedParameters.native,
    override: mergedParameters.override,
    stories: mergedParameters.stories,
    themeConverters: themeConverters,
    themes: mergedParameters.themes,
  }

  return parameters
}

export type updateAddonParametersProps = {
  apiParameters?: Parameters.ApiParameters
  settings: Settings.AddonSettings
}

export function updateAddonParameters({ apiParameters, settings }: updateAddonParametersProps) {
  // @TODO - Protect themes, defaultVariant, defaultTheme, override
  const { parameters: addonParameters } = settings

  if (!apiParameters) {
    return addonParameters
  }

  const parameters: Parameters.AddonParameters = {
    ...addonParameters,
    ...apiParameters,
    themeConverters: {
      ...addonParameters.themeConverters,
      ...(apiParameters.themeConverters || {}),
    },
  }

  return parameters
}

const getFirstThemeKey = (themes: Config.Themes) => Object.keys(themes).map((k) => k)[0]

export function verifyParameters(
  parametersSource: Parameters.AddonParameters,
  configSource: Config.AddonConfig
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
