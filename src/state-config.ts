import { themes as nativeThemes } from '@storybook/theming'
import { Parameters, Config } from './typings'
import { convertParameterThemeToConfigTheme } from './utils/convert-parameter-theme-to-config-theme'
import { validateThemeForConfig } from './utils/validate-theme-for-config'

export function createConfigDefaults(parameters: Parameters.Parameters) {
  const titles: Config.ConfigTitles = {
    native: (parameters.native && parameters.native.title) || 'Native Storybook',
  }

  const themes: Config.ConfigThemes = {
    native: {
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
    },
  }

  if (parameters.native && parameters.native.variants && parameters.native.variants.length > 0) {
    const hasLight = parameters.native.variants.includes('light')
    const hasDark = parameters.native.variants.includes('dark')

    if (!hasLight) {
      delete themes.native.light
    }

    if (!hasDark) {
      delete themes.native.dark
    }
  }

  if (parameters.themes !== false && parameters.themes.length > 0) {
    parameters.themes.forEach((theme) => {
      const validTheme = validateThemeForConfig(theme, parameters)

      if (validTheme) {
        const themeConverter = parameters.themeConverters[theme.type]

        titles[theme.key] = theme.title

        if (themeConverter) {
          const light = convertParameterThemeToConfigTheme({
            parameters,
            themeConfig: theme,
            themeVariant: theme.variants.light,
            converter: themeConverter,
            themeVariantName: 'light',
          })

          if (light !== null && light.converted !== null) {
            themes[theme.key] = {
              key: theme.key,
              type: theme.type,
              light: light.converted,
              original: { light: light.original },
            }
          }

          const dark = convertParameterThemeToConfigTheme({
            parameters,
            themeConfig: theme,
            themeVariant: theme.variants.dark,
            converter: themeConverter,
            themeVariantName: 'dark',
          })

          if (dark !== null && dark.converted) {
            if (!themes[theme.key]) {
              themes[theme.key] = {
                key: theme.key,
                type: theme.type,
                dark: dark.converted,
                original: { dark: dark.original },
              }
            } else {
              themes[theme.key].dark = dark.converted
              themes[theme.key].original.dark = dark.original
            }
          }
        }
      }
    })
  }

  const config: Config.Config = { titles, themes }

  return config
}

export function verifyConfig(configSource: Config.Config, parametersSource: Parameters.Parameters) {
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
