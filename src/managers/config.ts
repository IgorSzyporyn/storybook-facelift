import { themes as nativeThemes } from '@storybook/theming'
import { Parameters, Config } from '../typings'
import { convertParameterThemeToConfigTheme } from '../utils/convert-parameter-theme-to-config-theme'
import { validateThemeForConfig } from '../utils/validate-theme-for-config'

function createNativeTitle(parameters: Parameters.AddonParameters) {
  const title = (parameters.native && parameters.native.title) || 'Native Storybook'

  return title
}

function createNativeTheme(parameters: Parameters.AddonParameters) {
  const nativeTheme: Config.Theme = {
    type: 'native',
    key: 'native',
    light: {
      ...nativeThemes.light,
      ...(parameters.override || {}),
      ...((parameters.native && parameters.native.override) || {}),
    },
    dark: {
      ...nativeThemes.dark,
      ...(parameters.override || {}),
      ...((parameters.native && parameters.native.override) || {}),
    },
    original: {
      light: {
        ...nativeThemes.light,
        ...(parameters.override || {}),
        ...((parameters.native && parameters.native.override) || {}),
      },
      dark: {
        ...nativeThemes.dark,
        ...(parameters.override || {}),
        ...((parameters.native && parameters.native.override) || {}),
      },
    },
  }

  return nativeTheme
}

export function createConfigDefaults(parameters: Parameters.AddonParameters) {
  const returnTitles: Config.Titles = { native: createNativeTitle(parameters) }
  const returnThemes: Config.Themes = { native: createNativeTheme(parameters) }

  const { native: nativeParam, themes: themesParam = [] } = parameters

  // parameters: { native: { variants: ["dark"]} }
  // The config indicates that only dark mode is wanted for native
  if (nativeParam && nativeParam.variants && nativeParam.variants.length > 0) {
    const hasLight = nativeParam.variants.includes('light')
    const hasDark = nativeParam.variants.includes('dark')

    if (!hasLight && returnThemes.native) {
      delete returnThemes.native.light
    }

    if (!hasDark && returnThemes.native) {
      delete returnThemes.native.dark
    }
  }

  // Iterate through the given addon parameter themes and validate and convert
  // into a config object for settings.config - Just bail out if no themesParam
  if (!themesParam || themesParam.length === 0) {
    const config: Config.AddonConfig = { titles: returnTitles, themes: returnThemes }

    return config
  }

  themesParam.forEach((themeParam) => {
    const validTheme = validateThemeForConfig(themeParam, parameters)

    if (!validTheme) {
      return
    }

    const themeType = themeParam.type
    const themeKey = themeParam.key

    const themeConverter = parameters.themeConverters[themeType]

    returnTitles[themeKey] = themeParam.title

    if (themeConverter) {
      const light = convertParameterThemeToConfigTheme({
        parameters,
        themeConfig: themeParam,
        themeVariant: themeParam.variants.light,
        converter: themeConverter,
        themeVariantName: 'light',
      })

      if (light !== null && light.converted !== null) {
        returnThemes[themeKey] = {
          key: themeKey,
          type: themeType,
          light: light.converted,
          original: { light: light.original },
        }
      }

      const dark = convertParameterThemeToConfigTheme({
        parameters,
        themeConfig: themeParam,
        themeVariant: themeParam.variants.dark,
        converter: themeConverter,
        themeVariantName: 'dark',
      })

      if (dark !== null && dark.converted) {
        let returnTheme = returnThemes[themeKey]

        if (!returnTheme) {
          returnTheme = {
            key: themeKey,
            type: themeType,
            dark: dark.converted,
            original: { dark: dark.original },
          }
        } else {
          returnTheme.dark = dark.converted
          returnTheme.original.dark = dark.original
        }
      }
    }
  })

  const config: Config.AddonConfig = { titles: returnTitles, themes: returnThemes }

  return config
}

export function verifyConfig(
  configSource: Config.AddonConfig,
  parametersSource: Parameters.AddonParameters
) {
  const config = { ...configSource }
  const parameters = { ...parametersSource }

  const { themes } = config
  const { defaultTheme } = parameters

  const addedThemesLength = Object.keys(themes).length - 1
  const includeNative = parameters.includeNative === true
  const didAddThemes = addedThemesLength > 0

  if (!includeNative && didAddThemes && defaultTheme !== 'native') {
    delete config.themes.native
    delete config.titles.native
  }

  return config
}
